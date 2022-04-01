import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../services/character.service";
import {Character} from "../../../lib/character";
import {NbDialogRef} from "@nebular/theme";
import {Context, ContextGroup} from "../../../lib/context";
import {ContextService} from "../services/context.service";

@Component({
  selector: 'app-character-modal',
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.scss']
})
export class CharacterModalComponent implements OnInit {

  loading: boolean = true;
  character: Character | null = null;

  contextGroups: ContextGroup[] = [];
  selectedContext: Context | null = null;

  constructor(
    private characterService: CharacterService,
    private contextService: ContextService,
    protected dialogRef: NbDialogRef<any>
  ) { }

  generateCharacter(): void {
    this.loading = true;
    this.characterService.getRandomCharacter().subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }

  onSelectContext(context: Context): void {
    console.log(context);
    this.selectedContext = context;
  }

  createCharacterAndDialog(): void {
    if(this.loading || !this.character || !this.selectedContext) return;
    this.characterService.createDialogWithCharacter(this.character, this.selectedContext).subscribe(dialog => {
      this.dialogRef.close(dialog.id);
    });
  }

  ngOnInit(): void {
    this.generateCharacter();

    this.contextService.getGroupedContexts().subscribe(groups => {
      this.contextGroups = groups;
    });
  }

}
