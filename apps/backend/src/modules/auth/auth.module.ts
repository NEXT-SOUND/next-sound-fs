import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSchema } from './schema/session.schema';
import { SessionService } from './session.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    DynamooseModule.forFeature([
      {
        name: 'session',
        schema: SessionSchema,
      },
    ]),
  ],
  providers: [AuthService, SessionService, LocalStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}