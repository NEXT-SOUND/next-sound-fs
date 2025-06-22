export type UserProvider = 'local' | 'google' | 'github';
export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    provider: UserProvider;
    providerId?: string;
    accessToken?: string;
    refreshToken?: string;
    isEmailVerified: boolean;
    verificationToken?: string;
    createdAt: Date;
    updatedAt: Date;
}
