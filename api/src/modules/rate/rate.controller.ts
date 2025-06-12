import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { RateDto } from './rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly _ratesService: RateService) {}

  @Post()
  async AddRate(@Body() entity: RateDto): Promise<string> {
    const newRateDtoId = await this._ratesService.AddRate(entity);
    return Promise.resolve(newRateDtoId);
  }

  @Delete(':id')
  async DeleteRate(@Param('id') id: string): Promise<void> {
    const movie = await this._ratesService.GetRate(id);
    if (!movie) throw new NotFoundException(`Not Found Rate with id: ${id}`);
    await this._ratesService.DeleteRate(id);
  }
}
