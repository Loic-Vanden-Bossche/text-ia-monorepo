import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbChatModule, NbIconModule, NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogComponent } from './dialog/dialog.component';
import {DialogService} from "./dialog/dialog.service";
import {HttpClientModule} from "@angular/common/http";
import {SocketService} from "./socket.service";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
    HttpClientModule,
    NbIconModule,
    NbButtonModule
  ],
  providers: [DialogService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
