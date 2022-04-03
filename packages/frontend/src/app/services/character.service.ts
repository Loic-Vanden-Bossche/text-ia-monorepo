import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../../../lib/character";
import {map, switchMap} from "rxjs";
import {Dialog} from "../../../lib/dialog";
import {UserService} from "./user.service";
import {Context} from "../../../lib/context";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getRandomCharacter() {
    return this.http.get<Character>(`${environment.apiUrl}/characters/generate`);
  }

  createDialogWithCharacter(character: Character, context: Context) {
    return this.http.post<Character>(`${environment.apiUrl}/characters`, character)
      .pipe(switchMap((character) => this.http.post<Dialog>(`${environment.apiUrl}/dialogs`, {
        characterId: character.id,
        userId: this.userService.getUserId(),
        contextId: context.id
      })));
  }
}
