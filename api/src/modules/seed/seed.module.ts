import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MovieModule } from '../movie/movie.module';
import { ActorModule } from '../actor/actor.module';
import { RateModule } from '../rate/rate.module';
import { UserModule } from '../user/user.module';
import { MovieActorModule } from '../movieactor/movieactor.module';

@Module({
  imports: [MovieModule, ActorModule, RateModule, UserModule, MovieActorModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
