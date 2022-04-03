import {Injectable, OnInit} from '@angular/core';
import {Dialog} from "../../../lib/dialog";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Message} from "../../../lib/message";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }

  getDialog(id: string): Observable<Dialog> {
    return this.http.get<Dialog>(`${environment.apiUrl}/dialogs/` + id);
  }

  getDialogList(): Observable<Dialog[]> {
    return this.http.get<Dialog[]>(`${environment.apiUrl}/dialogs`);
  }

  getMessages(dialogId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/dialogs/${dialogId}/messages`);
  }

  resetDialog(dialogId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/messages/${dialogId}/reset`, {});
  }

  removeDialog(dialogId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/dialogs/${dialogId}`);
  }

}
