export declare class PineconeService {
    private pinecone;
    private embeddings;
    constructor();
    embedText(text: string, metadata?: Record<string, any>): Promise<{
        message: string;
        chunkCount: number;
    }>;
}
