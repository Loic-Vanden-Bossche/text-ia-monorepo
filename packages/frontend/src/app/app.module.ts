import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbChatModule,
  NbIconModule,
  NbButtonModule,
  NbDialogModule, NbCardModule, NbSpinnerModule, NbListModule, NbUserModule, NbAccordionModule, NbSelectModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogComponent } from './dialog/dialog.component';
import {DialogService} from "./services/dialog.service";
import {HttpClientModule} from "@angular/common/http";
import {SocketService} from "./services/socket.service";
import { CharacterModalComponent } from './character-modal/character-modal.component';
import { HomeComponent } from './home/home.component';
import {CharacterService} from "./services/character.service";
import {UserService} from "./services/user.service";
import { DialogListComponent } from './dialog-list/dialog-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    CharacterModalComponent,
    HomeComponent,
    DialogListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
    HttpClientModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbSpinnerModule,
    NbListModule,
    NbUserModule,
    NbAccordionModule,
    NbSelectModule
  ],
  providers: [DialogService, SocketService, CharacterService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
