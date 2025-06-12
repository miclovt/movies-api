import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieActorEntity } from './movieactor.entity';
import { MovieActorDto } from './movie.dto';

@Injectable()
export class MovieActorService {
  constructor(
    @InjectRepository(MovieActorEntity)
    private readonly _movieActorRepository: Repository<MovieActorEntity>,
  ) {}

  async AddNewActorToMovie(dto: MovieActorDto): Promise<string> {
    const result = await this._movieActorRepository
      .createQueryBuilder()
      .insert()
      .into(MovieActorEntity)
      .values([{ ...dto }])
      .execute();

    return Promise.resolve(result.raw.id);
  }

  async RemoveActorFromMovie(dto: MovieActorDto): Promise<void> {
    await this._movieActorRepository.delete(dto as MovieActorEntity);
  }

  async RemoveActorsFromMovie(id: string): Promise<void> {
    await this._movieActorRepository
      .createQueryBuilder()
      .delete()
      .from(MovieActorEntity)
      .execute();
  }
}
