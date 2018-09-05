import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppVersion} from "@ionic-native/app-version";
import {UnitsSettingsPartial} from "../partials/units-settings/units-settings";
import {Storage} from "@ionic/storage";
import {SettingsProvider} from "../../../providers/settings";


@Component({
  selector: 'page-settings-root',
  templateUrl: 'settings-root.html',
})
export class SettingsRootPage {

  version: string;

  @ViewChild(UnitsSettingsPartial) unitsSettings: UnitsSettingsPartial;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion, public settings: SettingsProvider) {
    appVersion.getVersionNumber().then(res => this.version = `v${res}`).catch(err => this.version = null);

  }

  ionViewDidLoad() {
  }

  popoverOptionsChanged(ev){
    this.settings.setPopoverOptions(ev);
  }

  ionViewWillLeave(){
    this.unitsSettings.editUnits = false;
  }

}
