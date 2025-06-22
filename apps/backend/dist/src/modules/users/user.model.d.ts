import { Item } from 'dynamoose/dist/Item';
import { IUser, UserProvider } from './types';
export declare const UserSchema: import("dynamoose/dist/Schema").Schema;
export declare class User extends Item implements IUser {
    id: string;
    email: string;
    password?: string;
    name: string;
    provider: UserProvider;
    providerId?: string;
    isEmailVerified: boolean;
    verificationToken?: string;
    createdAt: Date;
    updatedAt: Date;
}
