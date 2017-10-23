import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    this.items = this.srv.getCategories();
  }

  categoryClicked(category) {
    alert("Category clicked");
  }
  categoryEdit(category) {
    alert("Category edit");
  }
  categoryRemove(category) {
    alert("Category remove");
  }

}
