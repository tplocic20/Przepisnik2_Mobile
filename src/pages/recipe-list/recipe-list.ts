import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {FireProvider} from "../../providers/fire";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";
import {AddEditRecipePage} from "../add-edit-recipe/add-edit-recipe";

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
  cat: string;
  recipes: Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    this.cat = this.navParams.get('catId');
    this.title = this.navParams.get('catName') || "Wszystkie";
    this.recipes = this.srv.getRecipes(this.cat);
  }

  recipeClicked(recipe){
    this.navCtrl.push(RecipeDetailsPage, {recId: recipe.$key, recName: recipe.Name});
  }

  recipeAdd(){
    this.navCtrl.push(AddEditRecipePage, {selectedCategory: this.cat});
  }

}
