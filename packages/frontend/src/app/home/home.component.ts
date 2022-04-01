import { Component, OnInit } from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {CharacterModalComponent} from "../character-modal/character-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService: NbDialogService, private router: Router) { }

  ngOnInit(): void {
  }

  open() {
    this.dialogService.open(CharacterModalComponent).onClose.subscribe(dialogId => {
        if(dialogId) this.router.navigate(['/dialog/' + dialogId]);
    });
  }

}
