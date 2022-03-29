import {Dialog} from "./dialog";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
  dialogs: Dialog[];
}
