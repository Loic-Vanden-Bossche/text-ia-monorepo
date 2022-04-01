import { Injectable } from '@nestjs/common';
import { Character } from "./character.entity";
import CharacterCreateDto from "./character.create.dto";
import CharacterUpdateDto from "./character.update.dto";
import {CharacterDescription, FacesService} from "./faces.service";

@Injectable()
export class CharacterService {

  constructor(private facesService: FacesService) {}

  findAll(): Promise<Character[]> {
    return Character.find();
  }

  findOne(id: string): Promise<Character> {
    return Character.findOne(id);
  }

  formatCharacterDescription(character: CharacterDescription): Character {
   return Character.create({...character, age: parseInt(character.age)});
  }

  create(character: CharacterCreateDto): Promise<Character> {
    return Character.create({...character, internalDescription: character.description}).save();
  }

  getRandom(): Promise<Character> {
    return this.facesService.getRandomPerson().then(person => this.formatCharacterDescription(person));
  }

  async update(id: string, character: CharacterUpdateDto): Promise<Character> {
    return (await Character.findOne(id)).save();
  }

  async delete(id: string): Promise<Character> {
    return (await Character.findOne(id)).remove();
  }
}
