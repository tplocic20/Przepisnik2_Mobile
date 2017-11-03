import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {Observable} from "rxjs/Observable";
import {RecipeListPage} from "../recipe-list/recipe-list";
import {MessagesProvider} from "../../providers/messages";

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

  items: Observable<any>;

  constructor(public navCtrl: NavController, private srv: FireProvider, private msg: MessagesProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.items = this.srv.getCategories();
  }

  categoryClicked(category) {
    this.navCtrl.push(RecipeListPage, {catId: category.$key, catName: category.Name});
  }

  categoryEdit(category) {
    this.msg.alert.input("Edycja "+category.Name, data => this.srv.editCategory({...category, Name: data}), "Nazwa kategorii", category.Name, "Zapisz");
  }
  categoryRemove(category) {
    this.msg.alert.confirm('Usuń '+ category.Name, ()=>this.srv.removeCategory(category), 'Czy na pewno chcesz usunąć kategorię?' +
      '\nOperacji nie można cofnąć');
  }

  categoryAdd() {
  this.msg.alert.input("Nowa kategoria", data => this.srv.addCategory(data), "Nazwa kategorii");
  }

}
