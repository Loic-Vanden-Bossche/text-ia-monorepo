import {Injectable} from '@nestjs/common';
import { Character } from "./character.entity";
import CharacterCreateDto from "./character.create.dto";
import CharacterUpdateDto from "./character.update.dto";
import {CharacterDescription, FacesService} from "./faces.service";
import axios from "axios";

import excludeColumn from "../../lib/exclude-column";

@Injectable()
export class CharacterService {

  constructor(private facesService: FacesService) {}

  findAll(): Promise<Character[]> {
    return Character.find({ select: <(keyof Character)[]>excludeColumn(Character, ['image']) });
  }

  findOne(id: string): Promise<Character> {
    return Character.findOne({
      where: { id },
      select: <(keyof Character)[]>excludeColumn(Character, ['image'])
    });
  }

  getAvatar(id: string): Promise<Buffer> {
    return Character.query('SELECT encode(image, \'base64\') FROM public.characters WHERE id = $1', [id])
      .then(result => {
        return Buffer.from(result[0].encode, 'base64');
      });
  }

  formatCharacterDescription(character: CharacterDescription): Omit<CharacterDescription, 'age'> & { age: number } {
   return {...character, age: parseInt(<string>character.age)};
  }

  async create(character: CharacterCreateDto): Promise<Character> {
    const createdCharacter = await Character.create({...character, internalDescription: character.description, image: null}).save();
    await this.saveAvatar(createdCharacter.id, character.image);
    return createdCharacter;
  }

  saveAvatar(id: string, link: string): Promise<any> {
    return axios.get(link, {
      responseType: 'arraybuffer'
    })
    .then((res) => Buffer.from(res.data).toString('base64'))
    .then(base64 => Character.query('UPDATE public.characters SET image = decode($1, \'base64\') WHERE id = $2', [base64, id]))
  }

  getRandom(): Promise<Omit<CharacterDescription, 'age'> & { age: number }> {
    return this.facesService.getRandomPerson().then(person => this.formatCharacterDescription(person));
  }

  async update(id: string, character: CharacterUpdateDto): Promise<Character> {
    return (await Character.findOne(id)).save();
  }

  async delete(id: string): Promise<Character> {
    return (await Character.findOne(id)).remove();
  }
}
