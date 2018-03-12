import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FireProvider} from "../../../../providers/fire";
import {Observable} from "rxjs/Observable";
import {MessagesProvider} from "../../../../providers/messages";

@Component({
  selector: 'partial-units-settings',
  templateUrl: 'units-settings.html',
})
export class UnitsSettingsPartial {

  units: Observable<any[]>;
  editUnits: boolean = false;
  currentEdit: any;
  selectedUnits: string[] = [];

  get moreThanOneSelected() {
    return this.selectedUnits && this.selectedUnits.length > 0;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider) {
    this.units = this.srv.units;
  }

  addUnit() {
    this.msg.alert.input("Nowa jednostka", (data) => {
      this.srv.addUnit({Name: data});
    }, "Jednostka");
  }

  removeUnit(unit) {
    this.msg.alert.confirm(`Usuń ${unit.Name}`, () => this.srv.removeUnit(unit.$key), 'Czy na pewno chcesz usunąć jednostkę?' +
      '\nOperacji nie można cofnąć');
  }

  editUnit(unit) {
    this.cancelAllEdit();
    unit.isEditable = true;
    unit.editName = unit.Name;
    this.currentEdit = unit;
  }

  cancelAllEdit() {
    if (this.currentEdit) {
      this.currentEdit.isEditable = false;
      this.currentEdit = null;
    }
  }

  makeUnitsEditable() {
    this.cancelAllEdit();
    this.editUnits = !this.editUnits;
  }

  acceptChanges(item) {
    if (item.editName) {
      item.Name = item.editName;
      const key = item.$key;
      delete item.editName;
      delete item.isEditable;
      delete item.$key;
      this.srv.updateUnit(key, item);
    }
  }

  undoChanges(item) {
    delete item.editName;
    this.cancelAllEdit();
  }

  addRemoveUnit(item) {
    const idx = this.selectedUnits.indexOf(item.$key);
    if (idx > -1) {
      this.selectedUnits.splice(idx, 1);
    }
    else {
      this.selectedUnits.push(item.$key);
    }
  }

  addRemoveUnitClick(item){
    if (this.moreThanOneSelected){
      this.addRemoveUnit(item);
    }
  }


  unselectAll() {
    this.selectedUnits = [];
  }

  removeSelectedPropmpt() {
    this.msg.alert.confirm(`Usuń zaznaczone`, () => this.removeSelected(), 'Czy na pewno chcesz usunąć zaznaczone elementy?' +
      '\nOperacji nie można cofnąć');
  }

  removeSelected() {
    this.selectedUnits.forEach(item => {
      this.srv.removeUnit(item);
    });
  }

}
