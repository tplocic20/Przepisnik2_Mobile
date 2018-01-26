import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {SettingsProvider} from "../../providers/settings";

/**
 * Generated class for the HeaderPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-header-popover',
  templateUrl: 'header-popover.html',
})
export class HeaderPopoverComponent {

  name: string;
  selectedTheme: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private srv: FireProvider, private settings: SettingsProvider) {
    this.name = this.srv.userName;
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  changeBackground(color) {
    this.settings.setActiveTheme(color);
  }

  signOut() {
    this.viewCtrl.dismiss(true);

  }

}
