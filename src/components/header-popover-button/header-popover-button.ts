import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from '@ionic/angular';
import {FireProvider} from "../../providers/fire";

@Component({
  selector: 'page-header-popover-button',
  templateUrl: 'header-popover-button.html',
})
export class HeaderPopoverButtonComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private srv: FireProvider) {
  }

  popoverClicked(ev) {

  }

}
