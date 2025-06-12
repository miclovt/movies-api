import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RateEntity } from '../rate/rate.entity';
import { MovieDto } from './movie.dto';
import { MovieActorEntity } from '../movieactor/movieactor.entity';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  summary: string;
  @OneToMany(() => RateEntity, (rate) => rate.movie)
  @JoinColumn({ name: 'movieId' })
  rates: RateEntity[];
  @OneToMany(() => MovieActorEntity, (movieActor) => movieActor.actor)
  movieActors: MovieActorEntity[];

  static parse(dto: MovieDto): MovieEntity {
    const entity = new MovieEntity();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.summary = dto.summary;
    entity.movieActors = dto.actors?.map((x) => {
      const actor = new MovieActorEntity();
      actor.actorId = x.id;
      return actor;
    });
    entity.rates = dto.rates?.map((x) => {
      const rate = new RateEntity();
      rate.id = x.id;
      rate.movie = new MovieEntity();
      rate.movie.id = x.movieId;
      rate.value = rate.value;
      return rate;
    });

    return entity;
  }
}
