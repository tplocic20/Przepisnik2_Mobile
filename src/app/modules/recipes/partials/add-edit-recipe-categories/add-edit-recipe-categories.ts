import {Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MessagesProvider} from "../../../../../providers/messages";
import {FireProvider} from "../../../../../providers/fire";
import {Recipe} from "../../../../../models/Recipe";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'partial-add-edit-recipe-categories',
  templateUrl: 'add-edit-recipe-categories.html',
})
export class AddEditRecipeCategoriesPartial {

  private categories: any;
  private selectedCategories = [];
  @Input() recipe: Observable<Recipe>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private msg: MessagesProvider, private srv: FireProvider) {
    this.categories = this.srv.getCategories();
  }

  addCategory() {
    this.msg.alert.input("Nowa kategoria", data => this.srv.addCategory(data), "Nazwa kategorii");
  }

  addRemoveCategory(key) {
    const idx = this.selectedCategories.indexOf(key);
    if (idx > -1) {
      this.selectedCategories.splice(idx, 1);
    }
    else {
      this.selectedCategories.push(key);
    }
  }
}
