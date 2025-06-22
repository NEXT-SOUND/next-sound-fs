import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/service/user.service';
import { User } from '../user/types';
import { UserProvider } from '../user/types';
import { AuthResponse } from './dto/auth.response';
import { RegisterInput } from './dto/register.input';
import { SessionService } from './session.service';
export declare class AuthService {
    private usersService;
    private sessionService;
    private configService;
    private sesClient;
    private readonly RESEND_COOLDOWN;
    constructor(usersService: UsersService, sessionService: SessionService, configService: ConfigService);
    private sendVerificationEmail;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(user: Omit<User, 'password'>, response?: Response): Promise<AuthResponse>;
    register(registerDto: RegisterInput): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    handleOAuthLogin(profile: any, provider: UserProvider, response?: Response, accessToken?: string, refreshToken?: string): Promise<AuthResponse>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
