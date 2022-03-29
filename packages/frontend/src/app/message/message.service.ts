import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../../../lib/message";
import {User} from "../../../lib/user";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  postMessage(message: any): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/messages', message);
  }

  formatMessage(message: Message, user: User, reply = false): any {
    return {
      text: message.text,
      date: message.createdAt,
      reply,
      type: 'text',
      user: {
        name: user.name,
        avatar: 'https://i.gifer.com/no.gif',
      },
    };
  }
}
