// src/vector/vector.controller.ts
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';



import { Body, Controller, Headers, Post } from '@nestjs/common';

import { VectorInputEmbed, VectorInputFind } from './vector-input';
import { WeaviateService } from './vector.service';

dayjs.extend(utc);
dayjs.extend(timezone);

@Controller('vector')
export class VectorController {
  constructor(private readonly vectorService: WeaviateService) {}

  @Post('embed-text')
  async embedText(
    @Body() body: VectorInputEmbed,
    @Headers('x-timezone') timezone: string,
  ) {
    const { text, title, tags, userId } = body;

    const timestamp = dayjs().tz(timezone).unix();

    return this.vectorService.embedText(text, {
      title,
      tags,
      userId: userId.toString(),
      timestamp,
    });
  }

  @Post('search')
  async searchText(@Body() body: VectorInputFind) {
    return this.vectorService.searchText(body.query, body.userId.toString());
  }

  @Post('ask')
  async askQuestion(
    @Body() body: VectorInputFind,
    @Headers('x-timezone') timezone: string,
  ) {
    return this.vectorService.answerQuestion(
      body.query,
      body.userId.toString(),
      timezone ?? 'Asia/Seoul',
    );
  }
}