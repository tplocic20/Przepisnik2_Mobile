import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FireProvider} from "../../providers/fire/fire";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, private srv: FireProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.items = this.srv.getCategories();
  }

  categoryClicked(category) {
  }
  categoryEdit(category) {
  }
  categoryRemove(category) {
    const removeAlert = this.alertCtrl.create({
      title: 'Usuń '+ category.Name,
      message: 'Czy na pewno chcesz usunąć kategorię?' +
      'Operacji nie można cofnąć',
      buttons: [
        {
          text: 'Nie',
          role: 'cancel'
        },
        {
          text: 'Tak',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    removeAlert.present();
  }
  categoryAdd(){
    const createAlert = this.alertCtrl.create({
      title: "Nowa kategoria",
      inputs: [
        {
          name: 'categoryName',
          placeholder: 'Nazwa kategorii',
        }
      ],
      buttons: [
        {text: "Anuluj", role: "cancel"},
        {text: "Dodaj", handler: () =>{console.log("aaa")}}
      ]
    });
    createAlert.present();
  }

}
