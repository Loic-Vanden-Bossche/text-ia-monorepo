import {Message} from "./message";
import {User} from "./user";
import {Character} from "./character";
import {Context} from "./context";

export interface Dialog {
    id: string;
    isArchived: boolean;
    context: Context;
    user: User;
    messages: Message[];
    character: Character;
}
