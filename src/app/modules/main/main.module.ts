import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartPage} from "./components/start/start";
import {LoginPage} from "./components/login/login";
import {HomePage} from "./components/home/home.page";
import {MainRouting} from "./routing/main.routing";


@NgModule({
  declarations: [
    StartPage,
    LoginPage,
    HomePage
  ],
  imports: [
    CommonModule,
    MainRouting
  ]
})
export class MainModule {
}
