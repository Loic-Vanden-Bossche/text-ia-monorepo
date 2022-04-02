import {Dialog} from "./dialog";

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

export const getAvatar = (id: string) => `http://localhost:8080/characters/${id}/avatar`;
