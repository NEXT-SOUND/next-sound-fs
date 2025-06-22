import { Model } from 'nestjs-dynamoose';
interface Session {
    sessionId: string;
    userId: string;
    expiresAt: number;
    createdAt: number;
}
export declare class SessionService {
    private readonly sessionModel;
    private readonly sessionExpiry;
    constructor(sessionModel: Model<Session, Session['sessionId']>);
    createSession(userId: string): Promise<string>;
    validateSession(sessionId: string): Promise<string | null>;
    deleteSession(sessionId: string): Promise<void>;
}
export {};
