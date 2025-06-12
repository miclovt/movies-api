import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { RateEntity } from './rate.entity';

export class RateDto {
  id: string;
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsNumber()
  @Min(1)
  @Max(5)
  value: number; // 1-5
  static parse(entity: RateEntity): RateDto {
    const dto = new RateDto();
    dto.id = entity.id;
    dto.movieId = entity.movie.id;
    dto.userId = entity.user.id;
    dto.value = entity.value;
    return dto;
  }
}
