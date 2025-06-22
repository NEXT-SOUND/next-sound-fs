export declare class OpenAIService {
    private openaiUrl;
    private openaiApiKey;
    uploadFileToOpenAI(filePath: string): Promise<any>;
    queryGPTWithText(text: string): Promise<any>;
    queryGPTWithFiles(fileIds: string[], question: string): Promise<any>;
}
