import {Message} from "./message";
import {User} from "./user";
import {Character} from "./character";

export interface Dialog {
    id: string;
    isArchived: boolean;
    context: string;
    user: User;
    messages: Message[];
    character: Character;
}
