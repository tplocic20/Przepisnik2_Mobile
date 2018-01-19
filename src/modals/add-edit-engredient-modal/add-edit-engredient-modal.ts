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
  title: string = "Nowy składnik";

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.qty = this.navParams.get('qty');
    this.unit = this.navParams.get('unit');

    if (this.name) {
      this.title = 'Edycja "' + this.name + ' "';
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss({Name: this.name, Qty: this.qty, Unit: this.unit});
  }

}
