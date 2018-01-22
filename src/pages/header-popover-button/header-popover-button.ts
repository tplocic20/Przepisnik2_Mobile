import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {HeaderPopoverPage} from "../header-popover/header-popover";
import {StartPage} from "../start/start";
import {MessagesProvider} from "../../providers/messages";
import {FireProvider} from "../../providers/fire";

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
export class HeaderPopoverButtonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private srv: FireProvider) {
  }

  popoverClicked(ev) {
    let popover = this.popoverCtrl.create(HeaderPopoverPage);

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
