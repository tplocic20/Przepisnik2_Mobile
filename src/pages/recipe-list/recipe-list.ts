import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {FireProvider} from "../../providers/fire/fire";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";

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

  title: string;
  recipes: Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    const cat = this.navParams.get('catId');
    this.title = this.navParams.get('catName') || "Wszystkie";
    this.recipes = this.srv.getRecipes(cat);
  }

  recipeClicked(recipe){
    this.navCtrl.push(RecipeDetailsPage, {recId: recipe.$key, recName: recipe.Name});
  }

}
