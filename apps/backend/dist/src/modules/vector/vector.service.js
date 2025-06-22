"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaviateService = void 0;
const openai_1 = require("@langchain/openai");
const weaviate_1 = require("@langchain/weaviate");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const combine_documents_1 = require("langchain/chains/combine_documents");
const retrieval_1 = require("langchain/chains/retrieval");
const text_splitter_1 = require("langchain/text_splitter");
const lodash_1 = require("lodash");
const openai_2 = __importDefault(require("openai"));
const weaviate_ts_client_1 = __importStar(require("weaviate-ts-client"));
const common_1 = require("@nestjs/common");
const templat_1 = require("./templat");
const utils_1 = require("./utils");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
let WeaviateService = class WeaviateService {
    constructor() {
        this.client = weaviate_ts_client_1.default.client({
            scheme: 'https',
            host: process.env.WEAVIATE_HOST,
            apiKey: new weaviate_ts_client_1.ApiKey(process.env.WEAVIATE_API_KEY),
        });
        this.embeddings = new openai_1.OpenAIEmbeddings({
            model: 'text-embedding-3-large',
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
    }
    async embedText(text, metadata) {
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
            separators: ['\n\n', '\n', ' ', ''],
            keepSeparator: true,
        });
        const tenant = metadata.userId;
        const tenants = await this.client.schema.tenantsGetter('Document').do();
        const tenantExists = tenants.some((t) => t.name === tenant);
        if (!tenantExists) {
            await this.client.schema
                .tenantsCreator('Document', [{ name: tenant }])
                .do();
        }
        const docs = await splitter.createDocuments([text], [metadata], {});
        await weaviate_1.WeaviateStore.fromDocuments(docs, this.embeddings, {
            client: this.client,
            indexName: 'Document',
            tenant,
        });
        return { message: 'Text embedded successfully', chunkCount: docs.length };
    }
    async searchText(query, userId, filter) {
        const vectorStore = await weaviate_1.WeaviateStore.fromExistingIndex(this.embeddings, {
            client: this.client,
            indexName: 'Document',
            tenant: userId,
            metadataKeys: ['title', 'timestamp'],
        });
        const results = await vectorStore.similaritySearch(query, 5, {
            where: filter !== null && filter !== void 0 ? filter : {},
        });
        return results.map((doc) => ({
            text: doc.pageContent,
            metadata: doc.metadata,
        }));
    }
    async refineQuery(query, timezone) {
        const messages = await templat_1.SELF_QUERY_PROMPT.formatMessages({
            today: new Date().toLocaleString('en-US', { timeZone: timezone }),
            todayWeek: new Date().toLocaleString('en-US', {
                timeZone: timezone,
                weekday: 'long',
            }),
            timezone,
            query,
        });
        const openaiMessages = messages.map((msg) => {
            const dict = msg.toDict();
            return {
                role: dict.type === 'human' ? 'user' : dict.type,
                content: dict.data.content,
            };
        });
        const openai = new openai_2.default({ apiKey: process.env.OPENAI_API_KEY });
        const res = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: openaiMessages,
            temperature: 0,
        });
        const result = JSON.parse(res.choices[0].message.content);
        try {
            const transformedFilter = (0, utils_1.transformDateFilters)(result.filter, timezone);
            return Object.assign(Object.assign({}, result), { filter: transformedFilter });
        }
        catch (error) {
            console.error(error, '응답을 JSON으로 파싱하는 데 실패했습니다.');
            return result;
        }
    }
    async answerQuestion(query, userId, timezone) {
        var _a;
        console.time('질문 분석');
        const { filter } = await this.refineQuery(query, timezone);
        console.timeEnd('질문 분석');
        console.time('벡터 스토어 생성');
        const vectorStore = await weaviate_1.WeaviateStore.fromExistingIndex(this.embeddings, {
            client: this.client,
            indexName: 'Document',
            tenant: userId,
            metadataKeys: ['title', 'timestamp'],
        });
        console.timeEnd('벡터 스토어 생성');
        console.time('LLM 모델 초기화');
        const model = new openai_1.ChatOpenAI({
            temperature: 0.1,
            modelName: 'gpt-4o',
        });
        console.timeEnd('LLM 모델 초기화');
        console.time('문서 결합 체인 생성');
        const combineDocsChain = await (0, combine_documents_1.createStuffDocumentsChain)({
            llm: model,
            prompt: templat_1.QA_PROMPT,
        });
        console.timeEnd('문서 결합 체인 생성');
        console.log(filter, 'filter', filter === null || filter === void 0 ? void 0 : filter.operands);
        console.log((0, lodash_1.isEmpty)(filter === null || filter === void 0 ? void 0 : filter.operands)
            ? {
                where: filter,
            }
            : undefined);
        console.time('Retrieval 체인 생성');
        const chain = await (0, retrieval_1.createRetrievalChain)({
            retriever: vectorStore.asRetriever({
                k: 3,
                filter: {
                    where: filter,
                },
            }),
            combineDocsChain,
        });
        console.timeEnd('Retrieval 체인 생성');
        console.time('질문에 대한 응답 생성');
        const response = await chain.invoke({ input: query });
        console.timeEnd('질문에 대한 응답 생성');
        return {
            answer: response.answer,
            sources: (_a = response.context) === null || _a === void 0 ? void 0 : _a.map((doc) => ({
                content: doc.pageContent,
                metadata: doc.metadata,
            })),
            filter,
        };
    }
};
exports.WeaviateService = WeaviateService;
exports.WeaviateService = WeaviateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WeaviateService);
//# sourceMappingURL=vector.service.js.map