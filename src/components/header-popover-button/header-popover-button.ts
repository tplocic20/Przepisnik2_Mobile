import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';

import {FireProvider} from "../../providers/fire";
import {StartPage} from "../../app/modules/main/components/start/start";
import {HeaderPopoverComponent} from "../header-popover/header-popover";

/**
 * Generated class for the HeaderPopoverButtonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-header-popover-button',
  templateUrl: 'header-popover-button.html',
})
export class HeaderPopoverButtonComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private srv: FireProvider) {
  }

  popoverClicked(ev) {
    let popover = this.popoverCtrl.create(HeaderPopoverComponent);

    popover.onDidDismiss((logOut) => {
      if (logOut) {
        this.srv.signOut()
        this.navCtrl.setRoot(StartPage);
      }
    });
    popover.present({
      ev: ev
    });
  }

}
