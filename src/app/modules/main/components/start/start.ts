import {Component} from '@angular/core';



@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  selectedTheme: string;
  needsSignIn: boolean = false;
  autoLogInTimer: any;

  constructor() {
  }

  ionViewWillEnter() {
    // this.msg.loading.show("Ładowanie");
    this.autoLogInTimer = setTimeout(() => this.autoSignIn(), 2000);
  }

  autoSignIn() {

  }

  signIn() {

  }


}
