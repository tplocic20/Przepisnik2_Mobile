import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {FireProvider} from "../../../../providers/fire";
import {MessagesProvider} from "../../../../providers/messages";
import {RecipeListPage} from "../recipe-list/recipe-list";
import {AddEditRecipeModal} from "../modals/add-edit-recipe/add-edit-recipe";
import {Observable} from "rxjs";


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: Observable<any>;

  constructor() {
  }

  ionViewDidLoad() {
  }

  categoryClicked(category) {
  }

  categoryEdit(category) {
  }

  categoryRemove(category) {
  }

  recipeAdd() {
  }

  categoryAdd() {
  }

}
