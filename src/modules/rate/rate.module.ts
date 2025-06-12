import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from './rate.entity';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  providers: [RateService],
  exports: [RateService],
  controllers: [RateController],
})
export class RateModule {}
