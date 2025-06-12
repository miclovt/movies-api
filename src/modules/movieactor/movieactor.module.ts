import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieActorEntity } from './movieactor.entity';
import { MovieActorService } from './movieactor.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieActorEntity])],
  providers: [MovieActorService],
  exports: [MovieActorService],
})
export class MovieActorModule {}
