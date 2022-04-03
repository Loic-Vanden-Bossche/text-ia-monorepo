import {Component, Input, OnInit} from '@angular/core';
import {Character, getAvatar} from "../../../lib/character";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character: Character | null | undefined = null;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.character)
    }, 1000)
  }

  getAvatarUrl(character: Character): string {
    return getAvatar(character.id);
  }

}
