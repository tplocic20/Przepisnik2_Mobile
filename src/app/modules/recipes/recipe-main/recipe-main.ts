import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {CategoriesPage} from "../categories/categories";
import {SearchProvider} from "../../../../providers/search";
import {RecipeListPage} from "../recipe-list/recipe-list";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";

/**
 * Generated class for the RecipeMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recipe-main',
  templateUrl: 'recipe-main.html',
})
export class RecipeMainPage {

  recipesNestedRoot: any = CategoriesPage;
  // @ViewChild('recipesNav') nav: NavController;
  // @ViewChild('searchBar') searchBar: Searchbar;


  constructor(public navCtrl: NavController, public navParams: NavParams, public search: SearchProvider) {
  }

  ionViewDidLoad() {
    this.search.recipeSelected.subscribe(res=> {
    })
  }
  onSearchInput(ev) {
    // if (this.nav.last().component === CategoriesPage && this.search.value.length >= 3) {
    //   this.nav.push(RecipeListPage, {searchCall: true}).then(()=>{
    //     this.searchBar.setFocus();
    //   });
    // }
  }
}
