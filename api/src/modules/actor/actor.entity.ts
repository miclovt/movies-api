import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActorDto } from './actor.dto';
import { MovieActorEntity } from '../movieactor/movieactor.entity';

@Entity({ name: 'actor' })
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => MovieActorEntity, (movieActor) => movieActor.movie)
  movieActors: MovieActorEntity[];

  static parse(dto: ActorDto): ActorEntity {
    return dto as ActorEntity;
  }
}
