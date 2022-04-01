import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DialogComponent} from "./dialog/dialog.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dialog/:id', component: DialogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
