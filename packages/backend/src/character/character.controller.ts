import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterService } from "./character.service";
import { Character } from "./character.entity";
import CharacterUpdateDto from "./character.update.dto";
import CharacterCreateDto from "./character.create.dto";

@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  findAll(): Promise<Character[]> {
    return this.characterService.findAll();
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
