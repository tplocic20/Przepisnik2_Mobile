import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the AddEditEngredientModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-edit-engredient-modal',
  templateUrl: 'add-edit-engredient-modal.html',
})
export class AddEditEngredientModalPage {

  name: any;
  qty: any;
  unit: any;

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.qty = this.navParams.get('qty');
    this.unit = this.navParams.get('unit');
  }

  close() {
    this.viewCtrl.dismiss();
  }
  save() {
    this.viewCtrl.dismiss([this.name, this.qty, this.unit]);
  }

}
