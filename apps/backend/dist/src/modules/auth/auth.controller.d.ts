import { Request, Response } from 'express';
import { User } from '../user/types';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { RegisterInput } from './dto/register.input';
interface RequestWithUser extends Request {
    user: Omit<User, 'password'>;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterInput): Promise<{
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    login(req: RequestWithUser, response: Response): Promise<AuthResponse>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: RequestWithUser, res: Response): Promise<void>;
    githubAuth(): Promise<void>;
    githubAuthCallback(req: RequestWithUser, res: Response): Promise<void>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    checkSession(): Promise<boolean>;
}
export {};
