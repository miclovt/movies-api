import { IsNotEmpty, IsUUID } from 'class-validator';

export class MovieActorDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
  @IsNotEmpty()
  @IsUUID()
  actorId: string;
}
