export type User = {
    id: string;
    email: string;
    name: string;
    password?: string;
    provider: UserProvider;
    providerId?: string;
    accessToken?: string;
    refreshToken?: string;
    isVerified: boolean;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
};
