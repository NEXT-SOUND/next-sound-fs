import { Strategy, VerifyCallback } from 'passport-google-oauth20';



import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';



import { AuthService } from '../auth.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    // @ts-expect-error - ConfigService is not defined in the global scope
    private _configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: _configService.get('GOOGLE_CLIENT_ID')!,
      clientSecret: _configService.get('GOOGLE_CLIENT_SECRET')!,
      callbackURL: `${_configService.get('BACKEND_URL')}/auth/google/callback`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const result = await this.authService.handleOAuthLogin(
      profile,
      'google',
      undefined,
      accessToken,
      refreshToken,
    );
    done(null, result);
  }
}