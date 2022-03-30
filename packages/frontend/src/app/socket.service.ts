import { Injectable } from '@angular/core';
import {io, Socket} from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket | undefined = undefined;

  constructor() {   }

  setupSocketConnection() {
    this.socket = io('http://localhost:8090');
  }

  sendMessage(message: string) {
    this.socket?.emit('message', message);
  }

  subscribeToMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('message', (data: any) => observer.next(data));
    });
  }
}
