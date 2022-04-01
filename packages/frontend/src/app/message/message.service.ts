import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../../../lib/message";
import {User} from "../../../lib/user";
import * as dayjs from "dayjs";
import {Character} from "../../../lib/character";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  postMessage(message: any): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/messages', message);
  }

  private static toTimeZone(date: Date): Date {
    return dayjs(date).utc(true).toDate()
  }

  formatMessage(message: Message, user: User, character: Character, reply = false): any {
    return {
      text: message.text,
      date: MessageService.toTimeZone(message.createdAt),
      reply: !message.iaGenerated,
      type: 'text',
      user: {
        name: message.iaGenerated ? character.firstName: user.name,
        avatar: message.iaGenerated ? character.image : 'https://i.gifer.com/no.gif',
      },
    };
  }
}
