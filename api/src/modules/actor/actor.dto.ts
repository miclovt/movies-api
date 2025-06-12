import { IsNotEmpty, IsOptional } from 'class-validator';
import { ActorEntity } from './actor.entity';

export class ActorDto {
  id: string;
  @IsNotEmpty()
  name: string;
  static parse(entity: ActorEntity): ActorDto {
    return entity as ActorDto;
  }
}
