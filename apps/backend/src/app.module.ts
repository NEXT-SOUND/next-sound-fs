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
          BACKEND_URL: {
            production:
              'https://fm3ylhigv7.execute-api.us-east-1.amazonaws.com/dev',
            development: 'http://localhost:5024',
          }[process.env.NODE_ENV || 'development'],
          FRONTEND_URL: {
            production: 'https://next-sound-fe-web.vercel.app',
            development: 'http://localhost:3000',
          }[process.env.NODE_ENV || 'development'],
          COOKIE_DOMAIN: {
            production: 'next-sound-fe-web.vercel.app',
            development: 'localhost',
          }[process.env.NODE_ENV || 'development'],
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