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
} from '@nestjs/common';
import { ActorsService } from './actor.service';
import { ActorDto } from './actor.dto';

@Controller('actor')
export class actorsController {
  constructor(private readonly _actorsService: ActorsService) {}
  @Get(':id')
  async GetActor(@Param('id') id: string): Promise<ActorDto> {
    const actor = await this._actorsService.GetActor(id);
    if (!actor) throw new NotFoundException(`Not Found Actor with id: ${id}`);
    return Promise.resolve(actor);
  }

  @Get()
  async GetActors(@Query('name') name?: string): Promise<ActorDto[]> {
    return await this._actorsService.GetActors(name);
  }

  @Post()
  async CreatActor(@Body() entity: ActorDto): Promise<string> {
    const newactorDtoId = await this._actorsService.AddNewActor(entity);
    return Promise.resolve(newactorDtoId);
  }

  @Put(':id')
  async UpdateActor(
    @Param('id') id: string,
    @Body() entity: Omit<ActorDto, 'Id'>,
  ): Promise<void> {
    const actorDto = { ...entity, id: id };
    await this._actorsService.UpdateActor(actorDto);
  }

  @Delete(':id')
  async DeleteMovie(@Param('id') id: string): Promise<void> {
    const movie = await this._actorsService.GetActor(id);
    if (!movie) throw new NotFoundException(`Not Found Actor with id: ${id}`);

    await this._actorsService.DeleteActor(id);
  }
}
