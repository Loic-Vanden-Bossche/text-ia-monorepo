import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ApiResponse} from "../message/ia.service";
import {CharacterDescription} from "./faces.service";

@Injectable()
export class TranslationService {

  constructor(private http: HttpService) {}

  buildQuery(res: CharacterDescription) {
    return `Voici un texte en anglais:\\n\\n${ this.getConstruction(res)}\\n\\nTraduire le texte en français:\\n\\n`;
  }

  getWords(data: CharacterDescription) {
    const words = data.sex === 'female' ? { p: 'she', c: { normal: 'woman', young: 'girl' } } : { p: 'he', c: { normal: 'man', young: 'boy' } };
    return { p: words.p, c: (parseInt(data.age) >= 18 ? words.c.normal : words.c.young) }
  }

  getConstruction(res: CharacterDescription) {
    const words = this.getWords(res);
    return `${res.firstName} is a ${res.age} ${res.color} ${words.c}, ${words.p} have ${res.eyeColor} eyes, ${words.p} also have ${res.hairLength} ${res.hairColor}`;
  }

  getTranslation(prompt: string) : Promise<string> {
    const formatResponse = (data: ApiResponse) => data.choices[0].text;
    return this.http.post<ApiResponse>('https://api.cedille.ai/v1/engines/fr-boris/completions', {
        prompt,
        max_length: 70,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        repetition_penalty: 1.1,
        stop_sequences: []
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.CEDILLE_API_KEY}`
        }
      }).toPromise().then(response => formatResponse(response.data));
  }

  generateSummary(res: CharacterDescription): Promise<string> {
    return this.getTranslation(this.buildQuery(res)).then(tr => tr.split('\\n')[0]);
  }
}
