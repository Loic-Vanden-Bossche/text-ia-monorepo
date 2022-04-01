import { Component, OnInit } from '@angular/core';
import {DialogService} from "../services/dialog.service";
import {Dialog} from "../../../lib/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit {

  dialogs: Dialog[] = [];

  constructor(private dialogService: DialogService, private router: Router) { }

  ngOnInit(): void {
    this.dialogService.getDialogList().subscribe(dialogs => {
      this.dialogs = dialogs;
    });
  }

  openDialog(dialogId: string) {
    this.router.navigate(['/dialog', dialogId]);
  }

  removeDialog(event: any, dialogId: string) {

    event.preventDefault();
    event.stopPropagation();

    this.dialogService.removeDialog(dialogId).subscribe(() => {
      this.dialogs = this.dialogs.filter(dialog => dialog.id !== dialogId);
    });
  }

}
