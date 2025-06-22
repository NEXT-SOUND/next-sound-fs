import { CreateUserInput } from './create-user.input';
export type UserKey = {
    id: string;
};
export declare class User extends CreateUserInput {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isEmailVerified: boolean;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
}
