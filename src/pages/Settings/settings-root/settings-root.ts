import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppVersion} from "@ionic-native/app-version";

/**
 * Generated class for the SettingsRootPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-root',
  templateUrl: 'settings-root.html',
})
export class SettingsRootPage {

  version: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion) {
    appVersion.getVersionNumber().then(res => this.version = `v${res}`).catch(err => this.version = null);
  }

  ionViewDidLoad() {
  }

}
