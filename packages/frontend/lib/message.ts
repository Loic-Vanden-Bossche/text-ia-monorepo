import {Dialog} from "./dialog";

export interface Message {
  id: string;
  text: string;
  iaGenerated: boolean;
  dialog: Dialog;
  createdAt: Date;
  updatedAt: Date;
}
