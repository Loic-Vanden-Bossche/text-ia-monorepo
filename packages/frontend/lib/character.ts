import {Dialog} from "./dialog";

export interface Character {
  id: string;
  firstName: string;
  lastname: string;
  internalDescription: string;
  description: string;
  image: string;
  age: number;
  eyeColor: string;
  hairColor: string;
  hairLength: string;
  color: string;
  sex: string;
  dialogs: Dialog[];
}
