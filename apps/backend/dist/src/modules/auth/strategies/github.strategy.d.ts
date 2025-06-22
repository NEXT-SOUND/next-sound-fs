import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const GithubStrategy_base: new (...args: [options: import("passport-github2").StrategyOptions] | [options: import("passport-github2").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GithubStrategy extends GithubStrategy_base {
    private _configService;
    private authService;
    constructor(_configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
