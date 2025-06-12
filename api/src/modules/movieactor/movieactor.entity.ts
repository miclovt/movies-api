import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MovieEntity } from '../movie/movie.entity';
import { ActorEntity } from '../actor/actor.entity';

@Entity({ name: 'movie_actor' })
export class MovieActorEntity {
  @PrimaryColumn('uuid')
  movieId: string;
  @PrimaryColumn('uuid')
  actorId: string;
  @ManyToOne(() => MovieEntity, (movie) => movie.movieActors)
  @JoinColumn({ name: 'movieId' })
  movie: MovieEntity;

  @ManyToOne(() => ActorEntity, (actor) => actor.movieActors)
  @JoinColumn({ name: 'actorId' })
  actor: ActorEntity;
}
