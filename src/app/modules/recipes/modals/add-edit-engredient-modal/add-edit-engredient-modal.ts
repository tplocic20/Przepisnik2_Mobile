import {Component} from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {FireProvider} from "../../../../../providers/fire";


@Component({
  selector: 'page-add-edit-engredient-modal',
  templateUrl: 'add-edit-engredient-modal.html',
})
export class AddEditEngredientModal {

  name: any;
  qty: number;
  unit: any;
  title: string = "Nowy składnik";
  unitsList: Observable<any[]>;

  constructor(private viewCtrl: ViewController, public navParams: NavParams, private srv: FireProvider) {
    this.name = this.navParams.get('Name');
    this.qty = this.navParams.get('Qty') || 1;
    this.unit = this.navParams.get('Unit');
    this.unitsList = this.srv.units;

    if (this.name) {
      this.title = 'Edycja "' + this.name + ' "';
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss({Name: this.name, Qty: this.qty ? this.qty : "", Unit: this.unit ? this.unit : ""});
  }

}
