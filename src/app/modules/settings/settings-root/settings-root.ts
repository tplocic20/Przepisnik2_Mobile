import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
// import {AppVersion} from "@ionic-native/app-version";
import {UnitsSettingsPartial} from "../partials/units-settings/units-settings";
// import {Storage} from "@ionic/storage";
import {SettingsProvider} from "../../../../providers/settings";


@Component({
  selector: 'page-settings-root',
  templateUrl: 'settings-root.html',
})
export class SettingsRootPage {

  version: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settings: SettingsProvider) {

  }

  ionViewDidLoad() {
  }

  popoverOptionsChanged(ev){
  }

  ionViewWillLeave(){
  }

}
