// src/vector/pinecone.service.ts
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { WeaviateFilter, WeaviateStore } from "@langchain/weaviate";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { isEmpty } from "lodash";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import weaviate, { ApiKey, WeaviateClient } from "weaviate-ts-client";

import { Injectable } from "@nestjs/common";

import { QA_PROMPT, SELF_QUERY_PROMPT } from "./templat";
import { SelfQueryResult, VectorMetadata } from "./types";
import { transformDateFilters } from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class WeaviateService {
  private client: WeaviateClient;
  private embeddings: OpenAIEmbeddings;

  constructor() {
    this.client = weaviate.client({
      scheme: "https",
      host: process.env.WEAVIATE_HOST!, // e.g. weaviate-next-sound.fly.dev
      apiKey: new ApiKey(process.env.WEAVIATE_API_KEY!),
    });
    this.embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  // async searchTextWithSelfQuery(query: string, userId: string) {
  //   // Weaviate 클라이언트 초기화
  //   const client = weaviate.client({
  //     scheme: 'https',
  //     host: process.env.WEAVIATE_HOST!,
  //     apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
  //   });

  //   // 임베딩 및 LLM 초기화
  //   const embeddings = new OpenAIEmbeddings({
  //     model: 'text-embedding-3-large',
  //     openAIApiKey: process.env.OPENAI_API_KEY,
  //   });
  //   const llm = new ChatOpenAI({
  //     apiKey: process.env.OPENAI_API_KEY,
  //   });

  //   // 메타데이터 필드 정보 정의
  //   const attributeInfo: AttributeInfo[] = [
  //     {
  //       name: 'userId',
  //       description: 'User ID - always valueInt [valueInt]',
  //       type: dataType.TEXT,
  //     },
  //     {
  //       name: 'title',
  //       description: 'Document title - summary of the document [valueText]',
  //       type: dataType.TEXT,
  //     },
  //     {
  //       name: 'creationTime',
  //       description: 'Document creation date - valueDate [valueDate]',
  //       type: dataType.DATE,
  //     },
  //   ];

  //   // WeaviateStore 초기화
  //   const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
  //     client,
  //     indexName: 'Document',
  //     tenant: userId,
  //     textKey: 'text',
  //     metadataKeys: ['userId', 'title', 'creationTime'],
  //   });

  //   // SelfQueryRetriever 생성
  //   const retriever = SelfQueryRetriever.fromLLM({
  //     llm,
  //     vectorStore,
  //     documentContents: '문서 내용',
  //     attributeInfo,
  //     structuredQueryTranslator: new LoggingTranslator(),
  //   });

  //   // 쿼리 실행
  //   const results = await retriever.invoke(query);

  //   // 결과 반환
  //   return results.map((doc) => ({
  //     text: doc.pageContent,
  //     metadata: doc.metadata,
  //   }));
  // }

  async embedText(text: string, metadata: VectorMetadata) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
      separators: ["\n\n", "\n", " ", ""],
      keepSeparator: true,
    });

    const tenant = metadata.userId;

    // 테넌트 존재 여부 확인
    const tenants = await this.client.schema.tenantsGetter("Document").do();

    const tenantExists = tenants.some((t) => t.name === tenant);

    // 테넌트가 존재하지 않으면 생성
    if (!tenantExists) {
      await this.client.schema
        .tenantsCreator("Document", [{ name: tenant }])
        .do();
    }

    const docs = await splitter.createDocuments([text], [metadata], {
      // chunkHeader: metadata.title,
    });

    await WeaviateStore.fromDocuments(docs, this.embeddings, {
      client: this.client,
      indexName: "Document",
      tenant,
    });

    return { message: "Text embedded successfully", chunkCount: docs.length };
  }

  // For test only
  async searchText(
    query: string,
    userId: string,
    filter?: WeaviateFilter["where"],
  ) {
    const vectorStore = await WeaviateStore.fromExistingIndex(this.embeddings, {
      client: this.client,
      indexName: "Document",
      tenant: userId,
      metadataKeys: ["title", "timestamp"],
    });

    const results = await vectorStore.similaritySearch(query, 5, {
      where: filter ?? {},
    });
    return results.map((doc) => ({
      text: doc.pageContent,
      metadata: doc.metadata,
    }));
  }

  async refineQuery(query: string, timezone: string) {
    const messages = await SELF_QUERY_PROMPT.formatMessages({
      today: new Date().toLocaleString("en-US", { timeZone: timezone }),
      todayWeek: new Date().toLocaleString("en-US", {
        timeZone: timezone,
        weekday: "long",
      }),
      timezone,
      query,
    });

    const openaiMessages = messages.map((msg) => {
      const dict = msg.toDict();
      return {
        role: dict.type === "human" ? "user" : dict.type,
        content: dict.data.content,
      };
    });

    // OpenAI API 호출
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: openaiMessages as ChatCompletionMessageParam[],
      temperature: 0,
    });

    const result = JSON.parse(
      res.choices[0].message.content!,
    ) as SelfQueryResult;

    try {
      const transformedFilter = transformDateFilters(result.filter, timezone);
      return {
        ...result,
        filter: transformedFilter,
      };
    } catch (error) {
      console.error(error, "응답을 JSON으로 파싱하는 데 실패했습니다.");
      return result;
    }
  }

  async answerQuestion(query: string, userId: string, timezone: string) {
    console.time("질문 분석");
    const { filter } = await this.refineQuery(query, timezone);
    console.timeEnd("질문 분석");

    console.time("벡터 스토어 생성");
    const vectorStore = await WeaviateStore.fromExistingIndex(this.embeddings, {
      client: this.client,
      indexName: "Document",
      tenant: userId,
      metadataKeys: ["title", "timestamp"],
    });
    console.timeEnd("벡터 스토어 생성");

    console.time("LLM 모델 초기화");
    const model = new ChatOpenAI({
      temperature: 0.1,
      modelName: "gpt-4o",
    });
    console.timeEnd("LLM 모델 초기화");

    console.time("문서 결합 체인 생성");
    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt: QA_PROMPT,
    });
    console.timeEnd("문서 결합 체인 생성");

    console.log(filter, "filter", filter?.operands);

    console.log(
      isEmpty(filter?.operands)
        ? {
            where: filter,
          }
        : undefined,
    );

    console.time("Retrieval 체인 생성");
    const chain = await createRetrievalChain({
      retriever: vectorStore.asRetriever({
        k: 3,
        filter: {
          where: filter,
        },
      }),
      combineDocsChain,
    });
    console.timeEnd("Retrieval 체인 생성");

    console.time("질문에 대한 응답 생성");
    const response = await chain.invoke({ input: query });
    console.timeEnd("질문에 대한 응답 생성");

    return {
      answer: response.answer,
      sources: response.context?.map((doc: any) => ({
        content: doc.pageContent,
        metadata: doc.metadata,
      })),
      filter,
    };
  }
}
