import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {FireProvider} from "../../providers/fire/fire";

/**
 * Generated class for the RecipeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recipe-list',
  templateUrl: 'recipe-list.html',
})
export class RecipeListPage {

  recipes: Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    const cat = this.navParams.get('catId');
    this.recipes = this.srv.getRecipes(cat);
  }

}
