import { Injectable } from '@nestjs/common';
import { MovieDto } from './movie.dto';
import { ILike, Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieActorService } from '../movieactor/movieactor.service';
import { RateService } from '../rate/rate.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly _movieRepository: Repository<MovieEntity>,
    private readonly _movieActorService: MovieActorService,
    private readonly _rateService: RateService,
  ) {}
  async GetMovies(searchString?: string): Promise<MovieDto[]> {
    let result: MovieEntity[] = [];
    if (searchString) {
      result = await this._movieRepository.findBy({
        name: ILike(`%${searchString}%`),
      });
    } else {
      result = await this._movieRepository.find();
    }

    return Promise.resolve(result?.map((x) => MovieDto.parse(x)));
  }

  async GetMovie(id: string): Promise<MovieDto | null> {
    const result = await this._movieRepository.findOne({
      where: { id: id },
      relations: ['movieActors', 'movieActors.actor', 'rates', 'rates.user'],
    });
    console.log(JSON.stringify(result));
    return Promise.resolve(
      result ? MovieDto.parse(result as MovieEntity) : null,
    );
  }

  async AddNewMovie(dto: Omit<MovieDto, 'id'>): Promise<string> {
    const result = await this._movieRepository
      .createQueryBuilder()
      .insert()
      .into(MovieEntity)
      .values([{ ...MovieEntity.parse(dto as MovieDto) }])
      .returning('id')
      .execute();

    return Promise.resolve(result.raw[0].id);
  }
  async UpdateMovie(dto: MovieDto): Promise<void> {
    await this._movieRepository
      .createQueryBuilder()
      .update(MovieEntity)
      .set({ name: dto.name, summary: dto.summary })
      .where('id = :id', { id: dto.id })
      .execute();
  }
  async DeleteMovie(id: string): Promise<void> {
    await this._movieActorService.RemoveActorsFromMovie(id);
    await this._rateService.DeleteRatesByMovie(id);
    await this._movieRepository.delete(id);
  }
}
