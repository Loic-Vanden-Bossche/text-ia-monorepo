import {Body, Controller, Response, Delete, Get, Param, Post, Put, Res, StreamableFile} from '@nestjs/common';
import { CharacterService } from "./character.service";
import { Character } from "./character.entity";
import CharacterUpdateDto from "./character.update.dto";
import CharacterCreateDto from "./character.create.dto";
import {CharacterDescription} from "./faces.service";

@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  findAll(): Promise<Character[]> {
    return this.characterService.findAll();
  }

  @Get('/generate')
  random(): Promise<CharacterDescription> {
    return this.characterService.getRandom();
  }

  @Get(':id/avatar')
  getAvatar(@Param('id')id: string) {
    return new StreamableFile(this.characterService.getAvatar(id));
  }

  @Get(':id')
  findOne(@Param('id')id: string): Promise<Character> {
    return this.characterService.findOne(id);
  }

  @Post()
  create(@Body() character: CharacterCreateDto): Promise<Character> {
    return this.characterService.create(character);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() character: CharacterUpdateDto): Promise<Character> {
    return this.characterService.update(id, character);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Character> {
    return this.characterService.delete(id);
  }

}
