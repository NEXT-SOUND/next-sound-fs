import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../../user/service/user.service';
import { SessionService } from '../session.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.cookies) {
      return false;
    }

    const sessionId = request.cookies?.sessionId;

    if (!sessionId) {
      throw new UnauthorizedException('No session found');
    }

    const userId = await this.sessionService.validateSession(sessionId);
    if (!userId) {
      throw new UnauthorizedException('Invalid session');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;
    return true;
  }
}
