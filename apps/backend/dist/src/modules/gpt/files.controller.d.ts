import { OpenAIService } from './openai.service';
export declare class FilesController {
    private readonly openAIService;
    constructor(openAIService: OpenAIService);
    uploadFile(file: any): Promise<{
        message: string;
        fileId: string;
    }>;
    uploadText(body: {
        text: string;
    }): Promise<{
        message: string;
        response: any;
    }>;
    askQuestion(body: {
        question: string;
        fileIds: string[];
    }): Promise<any>;
}
