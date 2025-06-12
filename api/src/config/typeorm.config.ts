import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ActorEntity } from 'src/modules/actor/actor.entity';
import { MovieEntity } from 'src/modules/movie/movie.entity';
import { MovieActorEntity } from 'src/modules/movieactor/movieactor.entity';
import { RateEntity } from 'src/modules/rate/rate.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'movies',
  entities: [
    MovieEntity,
    ActorEntity,
    RateEntity,
    UserEntity,
    MovieActorEntity,
  ],
  synchronize: true,
};
