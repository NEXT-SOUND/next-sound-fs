import { OpenAIService } from './openai.service';
export declare class FilesController {
    private readonly openAIService;
    constructor(openAIService: OpenAIService);
    uploadFile(file: any): Promise<{
        message: string;
        fileId: string;
    }>;
    askQuestion(body: {
        question: string;
        fileIds: string[];
    }): Promise<any>;
}
