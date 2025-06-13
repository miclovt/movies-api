import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movie.service';
import { MovieDto } from './movie.dto';
import { RateService } from '../rate/rate.service';
import { RateAverageDto } from './rateAverage.dto';
import { ApiKeyGuard } from '../auth/apiKey.guard';
import { MovieActorDto } from '../movieactor/movie.dto';
import { MovieActorService } from '../movieactor/movieactor.service';
import { ActorsService } from '../actor/actor.service';

@Controller('movie')
export class MoviesController {
  constructor(
    private readonly _ratesService: RateService,
    private readonly _moviesService: MoviesService,
    private readonly _movieActorService: MovieActorService,
    private readonly _actorService: ActorsService,
  ) {}

  @Get()
  async GetMovies(@Query('name') name?: string): Promise<MovieDto[]> {
    return await this._moviesService.GetMovies(name);
  }

  @Get(':id')
  async GetMovie(@Param('id') id: string): Promise<MovieDto> {
    const movie = await this._moviesService.GetMovie(id);
    if (!movie) throw new NotFoundException(`Not Found Movie with id: ${id}`);
    return Promise.resolve(movie);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  async CreatMovie(@Body() entity: MovieDto): Promise<string> {
    const newMovieDtoId = await this._moviesService.AddNewMovie(entity);
    return Promise.resolve(newMovieDtoId);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  async UpdateMovie(
    @Param('id') id: string,
    @Body() entity: Omit<MovieDto, 'Id'>,
  ): Promise<void> {
    const movieDto = { ...entity, id: id };
    await this._moviesService.UpdateMovie(movieDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async DeleteMovie(@Param('id') id: string): Promise<void> {
    const movie = await this._moviesService.GetMovie(id);
    if (!movie) throw new NotFoundException(`Not Found Movie with id: ${id}`);

    await this._moviesService.DeleteMovie(id);
  }

  @Get(':id/rate')
  async GetMovieRate(@Param('id') id: string): Promise<RateAverageDto> {
    const movie = await this._moviesService.GetMovie(id);
    if (!movie) throw new NotFoundException(`Not Found Movie with id: ${id}`);

    const result = new RateAverageDto();
    result.movieId = id;
    result.average = await this._ratesService.GetMovieRate(id);
    return Promise.resolve(result);
  }

  @Post(':id/actor')
  async AddMovieActor(
    @Param('id') id: string,
    @Body() movieActor: Omit<MovieActorDto, 'movieId'>,
  ): Promise<void> {
    const movie = await this._moviesService.GetMovie(id);
    if (!movie) throw new NotFoundException(`Not Found Movie with id: ${id}`);

    const actor = await this._actorService.GetActor(movieActor.actorId);
    if (!actor) throw new NotFoundException(`Not Found Movie with id: ${id}`);

    await this._movieActorService.AddNewActorToMovie({
      actorId: movieActor.actorId,
      movieId: id,
    });
  }

  @Delete(':movieId/actor/:actorId')
  async RemoveMovieActor(
    @Param('movieId') movieId: string,
    @Param('actorId') actorId: string,
  ): Promise<void> {
    const movie = await this._moviesService.GetMovie(movieId);
    if (!movie)
      throw new NotFoundException(`Not Found Movie with id: ${movieId}`);

    const actor = await this._actorService.GetActor(actorId);
    if (!actor)
      throw new NotFoundException(`Not Found Actor with id: ${actorId}`);

    await this._movieActorService.RemoveActorFromMovie({
      actorId: actorId,
      movieId: movieId,
    });
  }
}
