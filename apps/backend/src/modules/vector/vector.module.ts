import { Module } from '@nestjs/common';

import { VectorController } from './vector.controller';
import { WeaviateService } from './vector.service';

@Module({
  controllers: [VectorController],
  providers: [WeaviateService],
})
export class VectorModule {}