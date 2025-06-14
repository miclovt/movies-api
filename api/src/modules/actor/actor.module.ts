import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actor.service';
import { ActorEntity } from './actor.entity';
import { ActorsController } from './actor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  providers: [ActorsService],
  exports: [ActorsService],
  controllers: [ActorsController],
})
export class ActorModule {}
