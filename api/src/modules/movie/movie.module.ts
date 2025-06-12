import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { MoviesService } from './movie.service';
import { RateModule } from '../rate/rate.module';
import { MovieActorModule } from '../movieactor/movieactor.module';
import { MoviesController } from './movie.controller';
import { ActorModule } from '../actor/actor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    MovieActorModule,
    ActorModule,
    RateModule,
  ],
  providers: [MoviesService],
  exports: [MoviesService],
  controllers: [MoviesController],
})
export class MovieModule {}
