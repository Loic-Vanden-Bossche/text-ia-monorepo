import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {TranslationService} from "./translation.service";
import {camelCase} from "typeorm/util/StringUtils";

export interface CharacterDescription {
    firstName: string;
    lastname: string;
    description: string;
    image: string;
    age: string | number;
    sex: string;
    eyeColor: string;
    hairColor: string;
    color: string;
    hairLength: string;
}

export interface NamesAPIResponse {
  "name": string;
  "address": string;
  "latitude": number;
  "longitude": number;
  "maiden_name": string;
  "birth_data": string;
  "phone_h": string;
  "phone_w": string;
  "email_u": string;
  "email_d": string;
  "username": string;
  "password": string;
  "domain": string;
  "useragent": string;
  "ipv4": string;
  "macaddress": string;
  "plasticcard": string;
  "cardexpir": string;
  "bonus": number;
  "company": string;
  "color": string;
  "uuid": string;
  "height": number;
  "weight": number;
  "blood": string;
  "eye": string;
  "hair": string;
  "pict": string;
  "url": string;
  "sport": string;
  "ipv4_url": string;
  "email_url": string;
  "domain_url": string;
}

@Injectable()
export class FacesService {

  questions = [
    'age',
    'origin',
    'sex',
    'eye color',
    'hair color',
    'color',
    'hair length'
  ]

  constructor(private http: HttpService, private translate: TranslationService) {}

  processImageQuestion(image: string, query: string) {
    const banana =  require("@banana-dev/banana-dev");
    const apiKey = "e3217c36-416a-44d5-b1b2-21960e5b902d";
    const modelKey = "carrot"

    const modelParameters = {
      "text": query,
      "imageURL": image,
      "similarity": false,
    }

    const run = async (modelParameters) => {
      return await banana.run(apiKey, modelKey, modelParameters);
    }

    return run(modelParameters);
  }

  processQuestions(image: string): Promise<CharacterDescription> {
    return Promise.all(this.questions.map(question => this.processImageQuestion(image, `What is the ${question} of this person ?`).then(res => ( { [question]: res.modelOutputs[0].answer as string } ))))
      .then((res: {[p: string]: string}[]) => {
        return res.map(o => Object.entries(o)
          .map(([k, v]) => ({ [camelCase(k)]: v })))
          .flat()
          .reduce((acc, cur) => ({ ...acc, ...cur }), {} as CharacterDescription)
    })
  }

  generateName(data: CharacterDescription): Promise<{ firstName: string, lastname: string }> {
    return this.http.get<NamesAPIResponse>(`https://api.namefake.com/french-france/${data.sex === 'female' ? 'female' : 'male' }/`)
      .toPromise().then(data => ({ firstName: data.data.name.split(' ')[0], lastname: data.data.name.split(' ')[1] }))
  }

  getRandomPerson(): Promise<CharacterDescription> {
    return this.http.get('https://this-person-does-not-exist.com/en?new').toPromise()
      .then(async response => ({
        ...(await this.processQuestions(`https://this-person-does-not-exist.com${response.data.src}`)),
        image: `https://this-person-does-not-exist.com${response.data.src}`,
      }))
      .then(async data => ({
        ...data,
        ...(await this.generateName(data)),
      }))
      .then(async data => ({
        ...data,
        description: await this.translate.generateSummary(data),
      }));
  }

}
