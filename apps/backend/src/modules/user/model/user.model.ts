import { Field, ID, ObjectType } from '@nestjs/graphql';





export type UserProvider = 'local' | 'google' | 'github';

export type UserKey = {
  id: string;
};

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  // password는 GraphQL에서 노출하지 않음 (보안상 이유)
  password?: string;

  @Field()
  name: string;

  @Field()
  provider: UserProvider;

  @Field({ nullable: true })
  providerId?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  isEmailVerified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  verificationToken?: string;

  @Field({ nullable: true })
  verificationTokenExpiresAt?: Date;
}