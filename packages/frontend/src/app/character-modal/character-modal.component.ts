import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../character.service";
import {Character} from "../../../lib/character";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-character-modal',
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.scss']
})
export class CharacterModalComponent implements OnInit {

  loading: boolean = true;
  character: Character | null = null;

  constructor(private characterService: CharacterService, protected dialogRef: NbDialogRef<any>) { }

  generateCharacter() {
    this.loading = true;
    this.characterService.getRandomCharacter().subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }

  createCharacterAndDialog() {
    if(this.loading || !this.character) return;
    this.characterService.createDialogWithCharacter(this.character).subscribe(dialog => {
      this.dialogRef.close(dialog.id);
    });
  }

  ngOnInit(): void {
    this.generateCharacter();
  }

}
