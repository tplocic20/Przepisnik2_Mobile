import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Observable} from "rxjs";
import {Recipe} from "../../../../models/Recipe";
import {FireProvider} from "../../../../providers/fire";
import {MessagesProvider} from "../../../../providers/messages";
import {AddEditRecipeModal} from "../modals/add-edit-recipe/add-edit-recipe";
import {ShareProvider} from "../../../../providers/share";
import {SearchProvider} from "../../../../providers/search";


@Component({
  selector: 'page-recipe-list',
  templateUrl: 'recipe-list.html',
})
export class RecipeListPage {

  // @ViewChild(List) list: List;
  title: string;
  cat: string;
  searchCall: boolean;
  recipes: Observable<Recipe[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private msg: MessagesProvider, private shareProv: ShareProvider, public search: SearchProvider) {
  }

  ionViewDidLoad() {
    this.cat = this.navParams.get('catId');
    this.searchCall = this.navParams.get('searchCall') || false;
    this.title = this.navParams.get('catName') || "Wszystkie";
  }

  recipeClicked(recipe) {
    // this.navCtrl.push(RecipeDetailsPage, {recId: recipe.$key, recName: recipe.Name});
    this.search.selectRecipe({recId: recipe.$key, recName: recipe.Name});
  }

  recipeAdd() {
    // this.navCtrl.push(AddEditRecipePage, {selectedCategory: this.cat});
  }

  recipeEdit(key) {
    // this.navCtrl.push(AddEditRecipePage, {recId: key});
  }

  recipeRemove(recipe){
  }

  recipeShare(recipe){
    // this.shareProv.share(recipe);
  }

}
