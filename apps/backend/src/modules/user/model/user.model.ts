import { Field, ID, ObjectType } from '@nestjs/graphql';

export type UserKey = {
  id: string;
};

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  provider: string;

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