import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {DialogService} from "../services/dialog.service";
import {Dialog} from "../../../lib/dialog";
import * as dayjs from "dayjs";

import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import {SocketService} from "../services/socket.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {forkJoin} from "rxjs";
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

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private socket: SocketService,
    private route: ActivatedRoute
  ) {
    this.messages = [];
    this.currentDialog = null;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(!params.has('id')) return;

      const id = <string>params.get('id');

      forkJoin([
        this.dialogService.getDialog(id),
        this.dialogService.getMessages(id)
      ]).subscribe((data) => {
        const [dialog, messages] = data;
        this.currentDialog = dialog;
        this.messages = messages.map(msg => this.messageService.formatMessage(msg, dialog.user, dialog.character));
      })
    });

    this.socket.subscribeToMessages().subscribe((message: Message) => {
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

  // reutrun to previous page
  return() {
    window.history.back();
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
