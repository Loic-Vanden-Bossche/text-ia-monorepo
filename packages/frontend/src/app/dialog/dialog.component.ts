import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message/message.service";
import {DialogService} from "./dialog.service";
import {Dialog} from "../../../lib/dialog";
import * as dayjs from "dayjs";

import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import {SocketService} from "../socket.service";
import {Message} from "../../../lib/message";

dayjs.extend(utc)
dayjs.extend(timezone)

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  messages: any[];
  currentDialog: Dialog | null;

  constructor(private messageService: MessageService, private dialogService: DialogService, private socket: SocketService) {
    this.messages = [];
    this.currentDialog = null;
  }

  ngOnInit() {
    this.dialogService.getFirstDialog().subscribe(dialog => {
      this.currentDialog = dialog;
      this.dialogService.getMessages(dialog.id).subscribe(messages => {
        this.messages = messages.map(msg => this.messageService.formatMessage(msg, dialog.user, dialog.character));
      });
    });

    this.socket.subscribeToMessages().subscribe((message: Message) => {
      console.log(message);
      if (!this.currentDialog) return;
      this.messages.push(this.messageService.formatMessage(message, this.currentDialog.user, this.currentDialog.character));
    });
  }

  resetDialog() {
    if (!this.currentDialog) return;
    this.dialogService.resetDialog(this.currentDialog?.id).subscribe(() => {
      this.messages = [];
    });
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: { src: any; type: any; }) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messageService.postMessage({ text: event.message, dialogId: this.currentDialog?.id }).subscribe(message => {
      if (!this.currentDialog) return;
      this.messages.push(this.messageService.formatMessage(message, this.currentDialog.user, this.currentDialog.character));
    });
  }

}
