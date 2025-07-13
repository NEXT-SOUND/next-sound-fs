import { DynamooseModule } from 'nestjs-dynamoose';



import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';



import * as modules from './modules';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
          BACKEND_URL: process.env.BACKEND_URL,
          FRONTEND_URL: process.env.FRONTEND_URL,
          COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
        }),
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    DynamooseModule.forRoot({
      local: process.env.IS_DDB_LOCAL === 'true',
      aws: { region: process.env.REGION },
      table: {
        create: process.env.IS_DDB_LOCAL === 'true',
        prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
        suffix: '-table',
      },
    }),
    ThrottlerModule.forRoot([
      //  @Throttle({ default: { limit: 3, ttl: 60 } })로 특정 API 제한
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    ...Object.values(modules),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}