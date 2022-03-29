import { Injectable } from '@nestjs/common';
import { Character } from "./character.entity";
import CharacterCreateDto from "./character.create.dto";

@Injectable()
export class CharacterService {

  findAll(): Promise<Character[]> {
    return Character.find();
  }

  findOne(id: string): Promise<Character> {
    return Character.findOne(id);
  }

  async create(character: CharacterCreateDto): Promise<Character> {
    const newCharacter = new Character();
    newCharacter.name = character.name;
    newCharacter.description = character.description;
    newCharacter.internalDescription = character.internalDescription;
    return newCharacter.save();
  }

  async update(id: string, character: CharacterCreateDto): Promise<Character> {
    const updatedCharacter = await Character.findOne(id);
    updatedCharacter.name = character.name;
    updatedCharacter.description = character.description;
    updatedCharacter.internalDescription = character.internalDescription;
    return updatedCharacter.save();
  }

  async delete(id: string): Promise<Character> {
    const deletedCharacter = await Character.findOne(id);
    return deletedCharacter.remove();
  }
}
