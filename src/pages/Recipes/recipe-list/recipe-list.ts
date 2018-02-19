import {Component, ViewChild} from '@angular/core';
import {List, ModalController, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";
import {Recipe} from "../../../models/Recipe";
import {FireProvider} from "../../../providers/fire";
import {MessagesProvider} from "../../../providers/messages";
import {AddEditRecipeModal} from "../modals/add-edit-recipe/add-edit-recipe";
import {ShareProvider} from "../../../providers/share";


@Component({
  selector: 'page-recipe-list',
  templateUrl: 'recipe-list.html',
})
export class RecipeListPage {

  @ViewChild(List) list: List;
  title: string;
  cat: string;
  recipes: Observable<Recipe[]>
  searchValue: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private msg: MessagesProvider, private shareProv: ShareProvider) {
  }

  ionViewDidLoad() {
    this.cat = this.navParams.get('catId');
    this.title = this.navParams.get('catName') || "Wszystkie";
    this.searchValue = this.navParams.get('search');
    this.recipes = this.srv.getRecipes(this.cat);

  }

  recipeClicked(recipe) {
    this.list.closeSlidingItems();
    this.navCtrl.push(RecipeDetailsPage, {recId: recipe.$key, recName: recipe.Name});
  }

  recipeAdd() {
    const modal = this.modalCtrl.create(AddEditRecipeModal, {selectedCategory: this.cat}, {cssClass: 'modal-full'});
    modal.present();
    // this.navCtrl.push(AddEditRecipePage, {selectedCategory: this.cat});
  }

  recipeEdit(key) {
    const modal = this.modalCtrl.create(AddEditRecipeModal, {recId: key}, {cssClass: 'modal-full'});
    modal.present();
    // this.navCtrl.push(AddEditRecipePage, {recId: key});
  }

  recipeRemove(recipe){
    this.msg.alert.confirm('Usuń '+ recipe.Name, ()=>this.srv.removeRecipe(recipe.$key), 'Czy na pewno chcesz usunąć przepiss?' +
      '\nOperacji nie można cofnąć');
  }

  recipeShare(recipe){
    this.shareProv.share(recipe);
  }

}
