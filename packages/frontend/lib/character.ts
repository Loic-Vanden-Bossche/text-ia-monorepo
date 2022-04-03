import {Dialog} from "./dialog";
import {environment} from "../src/environments/environment";

export interface Character {
  id: string;
  firstName: string;
  lastname: string;
  internalDescription: string;
  description: string;
  image?: string;
  age: number;
  eyeColor: string;
  hairColor: string;
  hairStyle: string;
  nationality: string;
  sex: string;
  dialogs: Dialog[];
}

export const getAvatar = (id: string) => `${environment.apiUrl}/characters/${id}/avatar`;
