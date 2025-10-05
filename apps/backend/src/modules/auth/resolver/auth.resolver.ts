import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';

import { User } from '../../user/types';
import { AuthResponse } from '../dto/auth.response';
import { RegisterInput } from '../dto/register.input';
import { AuthService } from '../auth.service';
import { SessionAuthGuard } from '../guards/session-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginInput } from '../../user/model/login.input';

interface RequestWithUser extends Request {
  user: Omit<User, 'password'>;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SessionAuthGuard)
  @Query(() => AuthResponse)
  checkSession(@Req() req: RequestWithUser): AuthResponse {
    // SessionAuthGuard에서 이미 사용자 정보를 검증했으므로 반환
    return {
      user: req.user,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthResponse)
  async login(
    @Args('input') loginInput: LoginInput,
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    return this.authService.login(req.user, response);
  }

  @Mutation(() => String)
  async register(@Args('input') registerInput: RegisterInput): Promise<string> {
    const result = await this.authService.register(registerInput);
    return result.message;
  }

  @UseGuards(SessionAuthGuard)
  @Mutation(() => String)
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const result = await this.authService.logout(response);
    return result.message;
  }
}
