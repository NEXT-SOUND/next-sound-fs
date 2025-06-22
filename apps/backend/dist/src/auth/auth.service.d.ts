import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private transporter;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    handleOAuthLogin(profile: any, provider: 'google' | 'github'): Promise<{
        access_token: string;
    }>;
}
