import { Injectable } from '@nestjs/common';
import { RateDto } from './rate.dto';
import { Repository } from 'typeorm';
import { RateEntity } from './rate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly _rateRepository: Repository<RateEntity>,
  ) {}
  async GetMovieRate(movieId: string): Promise<number | null> {
    return this._rateRepository.average('value', { movie: { id: movieId } });
  }

  async GetRate(id: string): Promise<RateDto | null> {
    const result = await this._rateRepository.findOne({
      where: { id: id },
    });

    return Promise.resolve(result ? RateDto.parse(result as RateEntity) : null);
  }

  async AddRate(entity: Omit<RateDto, 'id'>): Promise<string> {
    const result = await this._rateRepository
      .createQueryBuilder()
      .insert()
      .into(RateEntity)
      .values([{ ...RateEntity.parse(entity as RateDto) }])
      .returning('id')
      .execute();

    return Promise.resolve(result.raw[0].id);
  }

  async DeleteRate(id: string): Promise<void> {
    await this._rateRepository
      .createQueryBuilder()
      .delete()
      .from(RateEntity)
      .where('id = :id', { id: id })
      .execute();
  }

  async DeleteRatesByMovie(movieId: string): Promise<void> {
    await this._rateRepository
      .createQueryBuilder()
      .delete()
      .from(RateEntity)
      .where('movieId = :id', { id: movieId })
      .execute();
  }
}
