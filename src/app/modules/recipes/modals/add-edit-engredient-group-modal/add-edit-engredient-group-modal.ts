import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-add-edit-engredient-group-modal',
  templateUrl: 'add-edit-engredient-group-modal.html',
})
export class AddEditEngredientGroupModal {

  inputValue: "";
  title: string = "Nowa kategoria";

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.inputValue = this.navParams.get('value');
    if (this.inputValue) {
      this.title = 'Edycja "' + this.inputValue + ' "';
    }
  }

  save() {
    this.viewCtrl.dismiss(this.inputValue);
  }
  close(){
    this.viewCtrl.dismiss()
  }

}
