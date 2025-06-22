import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
export declare class OpenAIService {
    private configService;
    private openai;
    constructor(configService: ConfigService);
    createAssistant(name: string, instructions: string): Promise<OpenAI.Beta.Assistants.Assistant & {
        _request_id?: string | null;
    }>;
    createThread(): Promise<OpenAI.Beta.Threads.Thread & {
        _request_id?: string | null;
    }>;
    addMessageToThread(threadId: string, content: string): Promise<OpenAI.Beta.Threads.Messages.Message & {
        _request_id?: string | null;
    }>;
    addFile(file: OpenAI.Files.FileCreateParams): Promise<OpenAI.Files.FileObject & {
        _request_id?: string | null;
    }>;
}
