import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartPage} from "./components/start/start";
import {LoginPage} from "./components/login/login";
import {HomePage} from "./components/home/home.page";
import {MainRouting} from "./main.routing";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StartPage,
    LoginPage,
    HomePage,
  ],
  imports: [
    CommonModule,
    MainRouting,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule {
}
