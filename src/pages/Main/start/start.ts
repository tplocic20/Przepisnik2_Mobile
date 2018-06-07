import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {FireProvider} from "../../../providers/fire";
import {SettingsProvider} from "../../../providers/settings";
import {MessagesProvider} from "../../../providers/messages";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  selectedTheme: string;
  needsSignIn: boolean = false;
  autoLogInTimer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private srv: FireProvider, private settings: SettingsProvider, private msg: MessagesProvider) {
    settings.getActiveTheme().subscribe(theme => this.selectedTheme = theme);
  }

  ionViewWillEnter() {
    // this.msg.loading.show("Ładowanie");
    this.autoLogInTimer = setTimeout(() => this.autoSignIn(), 2000);
    this.srv.authCtx.subscribe(user => {
      if (user) {
        clearTimeout(this.autoLogInTimer);
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  autoSignIn() {
    if (this.srv.isSignedIn) {
    } else {
      this.srv.autoSignIn().then(val => {
        if (val) {
        } else {
          this.needsSignIn = true;
          this.msg.loading.close();
        }
      }, () => {
        this.needsSignIn = true;
        this.msg.loading.close();
      })
    }
  }

  signIn() {
    const modal = this.modalCtrl.create(LoginPage, null, {cssClass: 'modal-full ' + this.selectedTheme});
    modal.onDidDismiss(res => {
      if (res) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
    modal.present();
  }


}
