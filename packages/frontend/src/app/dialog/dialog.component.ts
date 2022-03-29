import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message/message.service";
import {DialogService} from "./dialog.service";
import {Dialog} from "../../../lib/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  messages: any[];

  currentDialog: Dialog | null;

  constructor(private messageService: MessageService, private dialogService: DialogService) {
    this.messages = [];
    this.currentDialog = null;
  }

  ngOnInit() {
    this.dialogService.getFirstDialog().subscribe(dialog => {
      this.currentDialog = dialog;
      this.dialogService.getMessages(dialog.id).subscribe(messages => {
        this.messages = messages.map(msg => this.messageService.formatMessage(msg, dialog.user));
      });
      console.log(dialog);
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
      console.log(message);
      this.messages.push({
        text: message.text,
        date: new Date(),
        reply: true,
        type: files.length ? 'file' : 'text',
        files: files,
        user: {
          name: message.dialog.user.name,
          avatar: 'https://i.gifer.com/no.gif',
        },
      });
      const botReply = null;
      if (botReply) {
        setTimeout(() => { this.messages.push(botReply) }, 500);
      }
    });
  }

}
