import {Message} from "./message";
import {User} from "./user";

export interface Dialog {
    id: string;
    isArchived: boolean;
    context: string;
    user: User;
    messages: Message[];
}
