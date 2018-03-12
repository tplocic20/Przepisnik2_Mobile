import {Component, ViewChild} from '@angular/core';
import {List, ModalController, NavController} from 'ionic-angular';
import {FireProvider} from "../../../providers/fire";
import {Observable} from "rxjs/Observable";
import {MessagesProvider} from "../../../providers/messages";
import {RecipeListPage} from "../recipe-list/recipe-list";
import {AddEditRecipeModal} from "../modals/add-edit-recipe/add-edit-recipe";


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  @ViewChild(List) list: List;
  items: Observable<any>;
  searchValue: "";

  constructor(public navCtrl: NavController, private srv: FireProvider, private msg: MessagesProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.items = this.srv.categories;
  }

  viewWillUnload() {
  }

  categoryClicked(category) {
    this.list.closeSlidingItems();
    this.navCtrl.push(RecipeListPage, {catId: category.$key, catName: category.Name});
  }

  categoryEdit(category) {
    this.msg.alert.input("Edycja " + category.Name, data => this.srv.editCategory({
      ...category,
      Name: data
    }), "Nazwa kategorii", category.Name, "Zapisz");
  }

  categoryRemove(category) {
    this.msg.alert.confirm('Usuń ' + category.Name, () => this.srv.removeCategory(category), 'Czy na pewno chcesz usunąć kategorię?' +
      '\nOperacji nie można cofnąć');
  }

  recipeAdd() {
    const modal = this.modalCtrl.create(AddEditRecipeModal, {}, {cssClass: 'modal-full'});
    modal.present();
  }

  categoryAdd() {
    this.msg.alert.input("Nowa kategoria", data => this.srv.addCategory(data), "Nazwa kategorii");
  }

  onSearchInput(ev) {
    if (this.searchValue.length >= 3) {
      this.navCtrl.push(RecipeListPage, {search: this.searchValue});
    }
  }

}
