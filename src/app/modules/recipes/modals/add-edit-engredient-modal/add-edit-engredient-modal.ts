import {Component} from '@angular/core';
import { NavParams} from '@ionic/angular';
import {Observable} from "rxjs";
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

  constructor(  public navParams: NavParams, private srv: FireProvider) {
    this.name = this.navParams.get('Name');
    this.qty = this.navParams.get('Qty') || 1;
    this.unit = this.navParams.get('Unit');

    if (this.name) {
      this.title = 'Edycja "' + this.name + ' "';
    }
  }

  close() {
  }

  save() {
  }

}
