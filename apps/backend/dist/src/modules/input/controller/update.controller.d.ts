import { OpenAIService } from '../service/openai.service';
export declare class UpdateController {
    private readonly openAIService;
    constructor(openAIService: OpenAIService);
    processFileAndQuestion(file: Express.Multer.File, question?: string): Promise<any>;
    processQuestion(question: string): Promise<any>;
    createAssistant(name: string, instructions: string): Promise<import("openai/resources/beta/assistants").Assistant & {
        _request_id?: string | null;
    }>;
    createThread(): Promise<import("openai/resources/beta/threads/threads").Thread & {
        _request_id?: string | null;
    }>;
    addMessage(threadId: string, content: string, fileIds?: string[]): Promise<import("openai/resources/beta/threads/messages").Message & {
        _request_id?: string | null;
    }>;
    runThread(threadId: string, assistantId: string): Promise<any>;
    getThreadMessages(threadId: string): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<any>;
}
