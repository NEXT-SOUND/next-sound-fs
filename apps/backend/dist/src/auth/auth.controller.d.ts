import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        message: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: any): Promise<void>;
    githubAuth(): Promise<void>;
    githubAuthCallback(req: any, res: any): Promise<void>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
