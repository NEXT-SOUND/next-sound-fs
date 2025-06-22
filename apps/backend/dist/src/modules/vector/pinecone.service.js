"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PineconeService = void 0;
const openai_1 = require("@langchain/openai");
const pinecone_1 = require("@langchain/pinecone");
const pinecone_2 = require("@pinecone-database/pinecone");
const text_splitter_1 = require("langchain/text_splitter");
const common_1 = require("@nestjs/common");
let PineconeService = class PineconeService {
    constructor() {
        this.pinecone = new pinecone_2.Pinecone();
        this.embeddings = new openai_1.OpenAIEmbeddings({
            model: 'text-embedding-3-large',
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
    }
    async embedText(text, metadata = {}) {
        var _a;
        console.log('start to embed');
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
        });
        const docs = await splitter.createDocuments([text], [metadata]);
        const index = this.pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const namespace = ((_a = metadata.userId) === null || _a === void 0 ? void 0 : _a.toString()) || 'default';
        await pinecone_1.PineconeStore.fromDocuments(docs, this.embeddings, {
            pineconeIndex: index,
            namespace,
            maxRetries: 2,
            onFailedAttempt: (error) => {
                console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
            },
        });
        return { message: 'Text embedded successfully', chunkCount: docs.length };
    }
};
exports.PineconeService = PineconeService;
exports.PineconeService = PineconeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PineconeService);
//# sourceMappingURL=pinecone.service.js.map