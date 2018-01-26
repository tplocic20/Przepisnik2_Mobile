import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {FireProvider} from "../../providers/fire";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";
import {AddEditRecipePage} from "../add-edit-recipe/add-edit-recipe";
import {Recipe} from "../../models/Recipe";
import {MessagesProvider} from "../../providers/messages";

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
  recipes: Observable<Recipe[]>
  searchValue: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private msg: MessagesProvider) {
  }

  ionViewDidLoad() {
    this.cat = this.navParams.get('catId');
    this.title = this.navParams.get('catName') || "Wszystkie";
    this.searchValue = this.navParams.get('search');
    this.recipes = this.srv.getRecipes(this.cat);

  }

  recipeClicked(recipe) {
    this.navCtrl.push(RecipeDetailsPage, {recId: recipe.$key, recName: recipe.Name});
  }

  recipeAdd() {
    const modal = this.modalCtrl.create(AddEditRecipePage, {selectedCategory: this.cat}, {cssClass: 'modal-full'});
    modal.present();
    // this.navCtrl.push(AddEditRecipePage, {selectedCategory: this.cat});
  }

  recipeEdit(key) {
    const modal = this.modalCtrl.create(AddEditRecipePage, {recId: key}, {cssClass: 'modal-full'});
    modal.present();
    // this.navCtrl.push(AddEditRecipePage, {recId: key});
  }

  recipeRemove(recipe){
    this.msg.alert.confirm('Usuń '+ recipe.Name, ()=>this.srv.removeRecipe(recipe.$key), 'Czy na pewno chcesz usunąć przepiss?' +
      '\nOperacji nie można cofnąć');
  }

}
