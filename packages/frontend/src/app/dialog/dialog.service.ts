import { Injectable } from '@angular/core';
import {Dialog} from "../../../lib/dialog";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Message} from "../../../lib/message";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }

  getFirstDialog(): Observable<Dialog> {
    return this.http.get<Dialog[]>('http://localhost:8080/dialogs').pipe(
      map(dialogs => dialogs[0])
    );
  }

  getMessages(dialogId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:8080/dialogs/${dialogId}/messages`);
  }

  resetDialog(dialogId: string): Observable<any> {
    return this.http.post(`http://localhost:8080/messages/${dialogId}/reset`, {});
  }

}
