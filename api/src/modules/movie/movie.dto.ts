import { IsNotEmpty } from 'class-validator';
import { ActorDto } from '../actor/actor.dto';
import { RateDto } from '../rate/rate.dto';
import { MovieEntity } from './movie.entity';

export class MovieDto {
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  summary: string;
  actors: ActorDto[];
  rates: RateDto[];

  static parse(entity: MovieEntity): MovieDto {
    const dto = new MovieDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.summary = entity.summary;
    dto.actors = entity.movieActors?.map((x) => {
      const actor = new ActorDto();
      actor.id = entity.id;
      return actor;
    });
    dto.rates = entity.rates?.map((x) => {
      const rate = new RateDto();
      rate.id = x.id;
      rate.movieId = x.movie.id;
      rate.value = rate.value;
      return rate;
    });

    return dto;
  }
}
