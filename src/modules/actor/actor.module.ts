import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actor.service';
import { ActorEntity } from './actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorModule {}
