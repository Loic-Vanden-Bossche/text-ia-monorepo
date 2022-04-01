import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../../lib/character";
import {map, switchMap} from "rxjs";
import {Dialog} from "../../lib/dialog";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getRandomCharacter() {
    return this.http.get<Character>('http://localhost:8080/characters/generate');
  }

  createDialogWithCharacter(character: Character) {
    return this.http.post<Character>('http://localhost:8080/characters', character)
      .pipe(switchMap((character) => this.http.post<Dialog>('http://localhost:8080/dialogs', {
        context: "This is a simple dialog between 2 persons",
        characterId: character.id,
        userId: this.userService.getUserId()
      })));
  }
}
