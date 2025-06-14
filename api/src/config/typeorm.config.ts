import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ActorEntity } from 'src/modules/actor/actor.entity';
import { MovieEntity } from 'src/modules/movie/movie.entity';
import { MovieActorEntity } from 'src/modules/movieactor/movieactor.entity';
import { RateEntity } from 'src/modules/rate/rate.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_USERPASS,
  database: process.env.DB_NAME,
  entities: [
    MovieEntity,
    ActorEntity,
    RateEntity,
    UserEntity,
    MovieActorEntity,
  ],
  synchronize: true,
};
