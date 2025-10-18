import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';

import { User, UserProvider } from '../user/model/user.model';
import { UsersService } from '../user/service/user.service';
import { AuthResponse } from './dto/auth.response';
import { RegisterInput } from './dto/register.input';
import { EmailVerificationRequiredException } from './exceptions/email-verification-required.exception';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  private sesClient: SESClient;
  private readonly RESEND_COOLDOWN = 3 * 60 * 1000; // 3 minutes

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private sessionService: SessionService,
  ) {
    this.sesClient = new SESClient({
      region: process.env.REGION,
    });
  }

  private async sendVerificationEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const sourceEmail = process.env.SMTP_FROM;

    const params = {
      Source: `inStage <${sourceEmail}>`,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: '🥁 inStage - 이메일 인증',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <div style="text-align: center; padding: 20px;">
                <h1 style="color: #333;">✉️ 이메일 인증</h1>
                <p style="color: #666; font-size: 16px;">아래 링크를 클릭하여 이메일을 인증해주세요:</p>
                <p style="color: #ff4444; font-size: 14px;">⚠️ 이 링크는 5분 후에 만료됩니다.</p>
                <a href="${verificationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px;">이메일 인증하기</a>
              </div>
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };

    try {
      await this.sesClient.send(new SendEmailCommand(params));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('이메일 전송에 실패했습니다.');
    }
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InternalServerErrorException('존재하지 않는 이메일입니다.');
    }

    if (user.isEmailVerified) {
      throw new InternalServerErrorException('이미 인증된 이메일입니다.');
    }

    // 마지막 전송 시간 체크
    if (user.verificationTokenExpiresAt) {
      const timeSinceLastSent =
        Date.now() -
        new Date(user.verificationTokenExpiresAt).getTime() +
        5 * 60 * 1000; // 만료 시간 + 5분
      if (timeSinceLastSent < this.RESEND_COOLDOWN) {
        const remainingTime = Math.ceil(
          (this.RESEND_COOLDOWN - timeSinceLastSent) / 1000,
        );
        throw new InternalServerErrorException(
          `Please try again later. (${remainingTime} seconds left)`,
        );
      }
    }

    const verificationToken = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 후 만료

    await this.sendVerificationEmail(email, verificationToken);
    await this.usersService.updateVerificationToken(
      user.id,
      verificationToken,
      expiresAt,
    );

    return { message: 'Verification email has been resent.' };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        if (!user.isEmailVerified) {
          throw new EmailVerificationRequiredException();
        }
        delete user.password;
        return user as Omit<User, 'password'>;
      }
    }
    return null;
  }

  async login(
    user: Omit<User, 'password'>,
    response?: Response,
  ): Promise<AuthResponse> {
    const sessionId = await this.sessionService.createSession(user.id);

    if (response) {
      const cookieOptions: any = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/',
      };

      // 도메인 설정
      if (process.env.COOKIE_DOMAIN) {
        cookieOptions.domain = process.env.COOKIE_DOMAIN;
      }

      response.cookie('sessionId', sessionId, cookieOptions);
    }

    return {
      user,
    };
  }

  async register(registerDto: RegisterInput): Promise<{ message: string }> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new InternalServerErrorException('Email already exists');
    }

    const verificationToken = uuidv4();
    const user = await this.usersService.create({
      ...registerDto,
      provider: 'local',
    });

    await this.sendVerificationEmail(registerDto.email, verificationToken);
    await this.usersService.updateVerificationToken(
      user.id,
      verificationToken,
      new Date(Date.now() + 5 * 60 * 1000), // 5분 후 만료
    );

    return { message: 'Registration completed. Please check your email.' };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const users = await this.usersService.findByVerificationToken(token);
    if (!users || users.length === 0) {
      throw new InternalServerErrorException('Invalid token');
    }

    const user = users[0];

    // 토큰 만료 시간 확인
    if (
      user.verificationTokenExpiresAt &&
      new Date() > new Date(user.verificationTokenExpiresAt)
    ) {
      throw new InternalServerErrorException(
        'Verification link has expired. Please request a new verification email.',
      );
    }

    await this.usersService.updateVerificationStatus(user.id, true);
    await this.usersService.updateVerificationToken(
      user.id,
      undefined,
      undefined,
    );

    // TODO: 인증완료시 로그인 하도록 수정해보자
    return { message: 'Email verification completed. Please login.' };
  }

  async handleOAuthLogin(
    profile: any,
    provider: UserProvider,
    response?: Response,
    accessToken?: string,
    refreshToken?: string,
  ): Promise<AuthResponse> {
    let user = await this.usersService.findByProviderId(profile.id);

    if (!user) {
      user = await this.usersService.create({
        email: profile.emails[0].value,
        name: profile.displayName,
        provider,
        providerId: profile.id,
        accessToken,
        refreshToken,
      });
    } else {
      await this.usersService.updateTokens(user.id, accessToken, refreshToken);
    }

    delete user.password;

    return this.login(user, response);
  }

  async logout(response: Response): Promise<{ message: string }> {
    const sessionId = response.req.cookies?.sessionId;
    if (sessionId) {
      await this.sessionService.deleteSession(sessionId);
    }
    response.clearCookie('sessionId');
    return { message: 'Logout completed.' };
  }
}
