import {Component} from '@angular/core';
import {Router} from "@angular/router";



@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  selectedTheme: string;
  needsSignIn: boolean = false;
  autoLogInTimer: any;

  constructor(private router: Router) {
  }

  ionViewWillEnter() {
    // this.msg.loading.show("Ładowanie");
    this.autoLogInTimer = setTimeout(() => this.autoSignIn(), 2000);
  }

  autoSignIn() {

  }

  signIn() {
    this.router.navigate(['/nav']);
  }

  start() {
    this.router.navigate(['/home']);
  }



}
