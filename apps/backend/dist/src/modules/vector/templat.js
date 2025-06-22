"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELF_QUERY_PROMPT = exports.QA_PROMPT = void 0;
const prompts_1 = require("@langchain/core/prompts");
const prompts_2 = require("@langchain/core/prompts");
exports.QA_PROMPT = prompts_1.PromptTemplate.fromTemplate(`
      너는 제공된 문서를 바탕으로 질문의 언어로 정확하고 구체적인 답변을 생성하는 어시스턴트야.
      질문과 연관이 있다면, '문서에 언급된 사실'을 우선순위로 사용해야해.
      가능하다면 문서와 질문에 언급된 대상 간의 관계도 추론해 설명해줘.

      문서, 질문의 언어가 다른 경우 질문의 언어로 번역해서 분석 및 답변해야해.
      문서는 시스템으로 부터 제공되므로, 문서에 대해 따로 언급하지 말아줘.

      문서:
      {context}

      질문:
      {input}

      정확하고 추론된 답변:
`);
exports.SELF_QUERY_PROMPT = prompts_2.ChatPromptTemplate.fromMessages([
    [
        'user',
        '오늘 날짜는 {today} {todayWeek} 기준으로 계산한다. 타임존은 {timezone} 이다. 일주일은 일요일부터 토요일까지 계산한다.',
    ],
    [
        'system',
        `당신은 사용자의 자연어 질문을 Weaviate의 필터 쿼리로 변환하는 전문가입니다.

      다음은 문서의 메타데이터 필드입니다:
      - userId: 문자열 (예: "12345")
      - title: 문자열 (예: "LangChain 소개")
      - timestamp: 날짜 (형식: "YYYY-MM-DD")
      - department: 문자열 (예: "데이터팀")

      사용자의 질문을 분석하여 다음 JSON 형식으로 필터를 생성하세요:
      operands는 nested 형식이 될 수 있습니다.
      {{
      "query": "<벡터 검색용 쿼리>",
      "filter": {{
      "operator": ("And" | "Or"),
      "operands": [
            {{
            "path": ["<속성명>"],
            "operator": "<연산자>",
            "valueString": "<값>"
            }},
            ...
      ]
      }}
      }}

      예시:
      질문: "지난달이나 이번주에 데이터팀이 작성한 문서 중 에러 보고와 관련된 것"
      결과:
      {{{{  
      "query": "에러 보고",
      "filter": {{
      "operator": "Or",
      "operands": [
            {{
            "operator": "And",
            "operands": [
            {{
                  "path": ["timestamp"],
                  "operator": "GreaterThanEqual",
                  "valueDate": "2025-04-01"
            }},
            {{
                  "path": ["timestamp"],
                  "operator": "LessThanEqual",
                  "valueDate": "2025-04-30"
            }},
            {{
                  "path": ["department"],
                  "operator": "Equal",
                  "valueString": "데이터팀"
            }}
            ]
            }},
            {{
            "operator": "And",
            "operands": [
            {{
                  "path": ["timestamp"],
                  "operator": "GreaterThanEqual",
                  "valueDate": "2025-05-12"
            }},
            {{
                  "path": ["timestamp"],
                  "operator": "LessThanEqual",
                  "valueDate": "2025-05-16"
            }},
            {{
                  "path": ["department"],
                  "operator": "Equal",
                  "valueString": "데이터팀"
            }}
            ]
            }}
      ]
      }}
      }}}}`,
    ],
    ['user', '질문: """{query}"""'],
]);
//# sourceMappingURL=templat.js.map