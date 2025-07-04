import { Strategy } from 'passport-github2';



import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';



import { AuthService } from '../auth.service';


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    // @ts-expect-error - ConfigService is not defined in the global scope
    private _configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: _configService.get('GITHUB_CLIENT_ID')!,
      clientSecret: _configService.get('GITHUB_CLIENT_SECRET')!,
      callbackURL: `${_configService.get('BACKEND_URL')}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const user = await this.authService.handleOAuthLogin(
      profile,
      'github',
      undefined,
      accessToken,
      refreshToken,
    );
    return user;
  }
}