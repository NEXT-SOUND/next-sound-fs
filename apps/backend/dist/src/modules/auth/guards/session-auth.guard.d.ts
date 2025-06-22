import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../user/service/user.service';
import { SessionService } from '../session.service';
export declare class SessionAuthGuard implements CanActivate {
    private readonly sessionService;
    private readonly usersService;
    constructor(sessionService: SessionService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
