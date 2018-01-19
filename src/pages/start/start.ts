import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {FireProvider} from "../../providers/fire";
import {SettingsProvider} from "../../providers/settings";

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  selectedTheme: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private srv: FireProvider, private settings: SettingsProvider) {
    settings.getActiveTheme().subscribe(theme => this.selectedTheme = theme);
  }

  ionViewWillEnter() {
    if (this.srv.isSignedIn) {
      this.navCtrl.setRoot(TabsPage);
    }
}

  logIn() {
    const modal = this.modalCtrl.create(LoginPage, null, {cssClass: 'modal-full '+this.selectedTheme});
    modal.onDidDismiss(res => {
      if (res){
        this.navCtrl.setRoot(TabsPage);
      }
    });
    modal.present();
  }


}
