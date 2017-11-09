import {Component, EventEmitter, Output} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the AddEditEngredientGroupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-edit-engredient-group-modal',
  templateUrl: 'add-edit-engredient-group-modal.html',
})
export class AddEditEngredientGroupModalPage {

  inputValue: "";

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.inputValue = this.navParams.get('value');
  }

  save() {
    this.viewCtrl.dismiss(this.inputValue);
  }
  close(){
    this.viewCtrl.dismiss()
  }

}
