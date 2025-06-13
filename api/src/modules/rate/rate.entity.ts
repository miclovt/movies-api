import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from '../movie/movie.entity';
import { UserEntity } from '../user/user.entity';
import { RateDto } from './rate.dto';

@Entity({ name: 'rate' })
export class RateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  value: number;
  @ManyToOne(() => MovieEntity, (movie) => movie.rates)
  movie: MovieEntity;
  @Column('uuid')
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.rates)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  static parse(dto: RateDto): RateEntity {
    const entity = new RateEntity();
    entity.id = dto.id;
    entity.value = dto.value;
    entity.movie = new MovieEntity();
    entity.movie.id = dto.movieId;
    entity.userId = dto.userId;
    return entity;
  }
}
