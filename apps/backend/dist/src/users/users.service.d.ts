import { Model } from 'nestjs-dynamoose';
import { CreateUserInput } from './model/create-user.input';
import { User, UserKey } from './model/user.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User, UserKey>);
    create(createUserDto: CreateUserInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByProviderId(providerId: string): Promise<User | null>;
    findByVerificationToken(token: string): Promise<User[]>;
    updateVerificationStatus(id: string, isVerified: boolean): Promise<User>;
    updateVerificationToken(id: string, verificationToken: string | undefined): Promise<User>;
}
