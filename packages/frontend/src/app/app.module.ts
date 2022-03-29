import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbChatModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogComponent } from './dialog/dialog.component';
import {DialogService} from "./dialog/dialog.service";
import { MessageComponent } from './message/message.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
    HttpClientModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
