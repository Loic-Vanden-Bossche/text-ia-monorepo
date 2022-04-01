import {Component, OnInit} from '@angular/core';
import {SocketService} from "./services/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'ia-chat';

  constructor(private socketService: SocketService ) {
    this.socketService.setupSocketConnection();
  }
}
