import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CharacterDescription} from "./faces.service";
import {spawn} from "child_process";
import {join} from "path";

@Injectable()
export class TranslationService {

  constructor() {}

  getWords(data: CharacterDescription) {
    const words = data.sex === 'female' ? { p: 'she', c: { normal: 'woman', young: 'girl' } } : { p: 'he', c: { normal: 'man', young: 'boy' } };
    return { p: words.p, c: (parseInt(<string>data.age) >= 18 ? words.c.normal : words.c.young) }
  }

  getConstruction(res: CharacterDescription) {
    const words = this.getWords(res);
    return `${res.firstName} is a ${res.age} years old ${res.nationality} ${words.c}, ${words.p} have ${res.eyeColor} eyes, ${words.p} also have ${res.hairColor} ${res.hairStyle} hairs.`;
  }

  getTranslation(toTranslate: string): Promise<string> {
    return  Promise.race([new Promise<string>(((_, reject) => {
      setTimeout(() => { reject('timeout') }, 5000);
    })),new Promise<string>(((resolve, reject) => {
      const program = spawn('python', [join(process.cwd(), 'python', 'translator.py'), toTranslate]);
      program.stderr.on('data', (data) => {
        reject(data.toString());
      })
      program.stdout.setEncoding('latin1').on('data', (data) => {
          const translated = data.toString();
          if(translated === 'error') {
            reject('Something went wrong');
          } else {
            resolve(translated);
          }
        });
    }))]);
  }

  generateSummary(res: CharacterDescription): Promise<string> {
    return this.getTranslation(this.getConstruction(res)).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
