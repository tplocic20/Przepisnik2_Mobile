import {Component} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {FireProvider} from "../../providers/fire";
import {SettingsProvider} from "../../providers/settings";

@Component({
  selector: 'page-header-popover',
  templateUrl: 'header-popover.html',
})
export class HeaderPopoverComponent {

  name: string;
  selectedTheme: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private settings: SettingsProvider) {
  }

  changeBackground(color) {
  }

  signOut() {

  }

}
