import { Dialog } from "./dialog";

export interface Context {
  id: string;
  name: string;
  description: string;
  internalDescription: string;
  type: string;
  dialogs: Dialog[];
}

export interface ContextGroup {
  name: string;
  contexts: Context[];
}
