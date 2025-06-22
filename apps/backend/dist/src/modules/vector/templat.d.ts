import { PromptTemplate } from '@langchain/core/prompts';
import { ChatPromptTemplate } from '@langchain/core/prompts';
export declare const QA_PROMPT: PromptTemplate<import("@langchain/core/prompts").ParamsFromFString<"\n      너는 제공된 문서를 바탕으로 질문의 언어로 정확하고 구체적인 답변을 생성하는 어시스턴트야.\n      질문과 연관이 있다면, '문서에 언급된 사실'을 우선순위로 사용해야해.\n      가능하다면 문서와 질문에 언급된 대상 간의 관계도 추론해 설명해줘.\n\n      문서, 질문의 언어가 다른 경우 질문의 언어로 번역해서 분석 및 답변해야해.\n      문서는 시스템으로 부터 제공되므로, 문서에 대해 따로 언급하지 말아줘.\n\n      문서:\n      {context}\n\n      질문:\n      {input}\n\n      정확하고 추론된 답변:\n">, any>;
export declare const SELF_QUERY_PROMPT: ChatPromptTemplate<any, any>;
