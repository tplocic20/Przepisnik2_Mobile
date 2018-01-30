import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {FireProvider} from "../../../providers/fire";
import {SettingsProvider} from "../../../providers/settings";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  selectedTheme: string;
  needsSignIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private srv: FireProvider, private settings: SettingsProvider) {
    settings.getActiveTheme().subscribe(theme => this.selectedTheme = theme);
  }

  ionViewWillEnter() {
     this.autoSignIn();
  }

  autoSignIn() {
    if (this.srv.isSignedIn) {
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.srv.autoSignIn().then(val => {
        if (val) {
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.needsSignIn = true;
        }
      }, () =>{
        this.needsSignIn = true;
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
