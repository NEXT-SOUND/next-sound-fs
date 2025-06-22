import { UserProvider } from '../types';
export declare class CreateUserInput {
    email: string;
    password?: string;
    name: string;
    provider: UserProvider;
    providerId?: string;
    accessToken?: string;
    refreshToken?: string;
}
