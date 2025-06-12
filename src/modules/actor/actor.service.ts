import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { ActorEntity } from './actor.entity';
import { ActorDto } from './actor.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly _actorsRepository: Repository<ActorEntity>,
  ) {}

  async GetActors(searchString?: string): Promise<ActorDto[]> {
    let result: ActorEntity[] = [];
    if (searchString) {
      result = await this._actorsRepository.findBy({
        name: ILike(`%${searchString}%`),
      });
    } else {
      result = await this._actorsRepository.find();
    }

    return Promise.resolve(result?.map((x) => ActorDto.parse(x)));
  }
  async GetActor(id: string): Promise<ActorDto | null> {
    const result = await this._actorsRepository.findOne({
      where: { id: id },
    });

    return Promise.resolve(
      result ? ActorDto.parse(result as ActorEntity) : null,
    );
  }

  async AddNewActor(dto: Omit<ActorDto, 'id'>): Promise<string> {
    const result = await this._actorsRepository
      .createQueryBuilder()
      .insert()
      .into(ActorEntity)
      .values([{ ...ActorEntity.parse(dto as ActorDto) }])
      .returning('id')
      .execute();
    return Promise.resolve(result.raw[0].id);
  }

  async UpdateActor(dto: ActorDto): Promise<void> {
    await this._actorsRepository
      .createQueryBuilder()
      .update(ActorEntity)
      .set({ name: dto.name })
      .where('id = :id', { id: dto.id })
      .execute();
  }

  async DeleteActor(id: string): Promise<void> {
    await this._actorsRepository
      .createQueryBuilder()
      .delete()
      .from(ActorEntity)
      .where('id = :id', { id: id })
      .execute();
  }
}
