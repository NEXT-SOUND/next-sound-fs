import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';

@InputType()
@InterfaceType('VectorInputFind')
export class VectorInputFind {
  @IsNotEmpty()
  @IsString()
  @Field()
  query: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;
}

@InputType()
@InterfaceType('VectorInputEmbed')
export class VectorInputEmbed {
  @IsNotEmpty()
  @IsString()
  @Field()
  text: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  fileName?: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  tags?: string[];
}