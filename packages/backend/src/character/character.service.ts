import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Character } from "./character.entity";
import CharacterCreateDto from "./character.create.dto";
import CharacterUpdateDto from "./character.update.dto";
import {CharacterDescription, FacesService} from "./faces.service";
import {createReadStream, ReadStream} from "fs";
import { join } from 'path';
import * as fs from 'fs';
import * as download from "download";

@Injectable()
export class CharacterService {

  constructor(private facesService: FacesService) {}

  findAll(): Promise<Character[]> {
    return Character.find();
  }

  findOne(id: string): Promise<Character> {
    return Character.findOne(id);
  }

  getAvatar(id: string): ReadStream {
    const path = join(process.cwd(), 'avatars', `${id}.jpg`);
    if(fs.existsSync(path)) {
      return createReadStream(path);
    }

    throw new HttpException('Avatar not found', HttpStatus.NOT_FOUND);
  }

  formatCharacterDescription(character: CharacterDescription): CharacterDescription {
   return {...character, age: parseInt(<string>character.age)};
  }

  async create(character: CharacterCreateDto): Promise<Character> {
    const createdCharacter = await Character.create({...character, internalDescription: character.description}).save();
    await this.saveAvatar(createdCharacter.id, character.image);
    return createdCharacter;
  }

  saveAvatar(id: string, link: string): Promise<Buffer> {
    return download(link, join(process.cwd(), 'avatars'), { filename: `${id}.jpg`});
  }

  getRandom(): Promise<CharacterDescription> {
    return this.facesService.getRandomPerson().then(person => this.formatCharacterDescription(person));
  }

  async update(id: string, character: CharacterUpdateDto): Promise<Character> {
    return (await Character.findOne(id)).save();
  }

  async delete(id: string): Promise<Character> {
    return (await Character.findOne(id)).remove();
  }
}
