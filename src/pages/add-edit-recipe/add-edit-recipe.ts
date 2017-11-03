import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {MessagesProvider} from "../../providers/messages";

/**
 * Generated class for the AddEditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-edit-recipe',
  templateUrl: 'add-edit-recipe.html',
})
export class AddEditRecipePage {

  @ViewChild(Slides) slides: Slides;
  recipe:any;
  selectedCategories = [];
  categories:any;
  activeSlide:string = "0";
  addingToGroup: number;
  newEngredient: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider) {
    this.categories = this.srv.getCategories();
  }

  ionViewDidLoad() {
    this.selectedCategories.push(this.navParams.get('selectedCategory'));
    const recipeId = this.navParams.get('recId');
    if (recipeId) {
      this.srv.getRecipe(recipeId).subscribe(res => {this.recipe = res;
      this.selectedCategories.push(this.recipe.Categories.split(';'))});
    }
    else {
      this.recipe = {};
      this.recipe.Engredients = [{Name: "Składniki", Positions: []}];
    }
  }

  onSlideChanged() {
    const idx = this.slides.getActiveIndex();
    this.activeSlide = idx.toString();
  }

  onSegmentChanged(ev) {
    this.slides.slideTo(ev.value);
  }

  addEngredientCategory(){
    this.msg.alert.input("Nowa kategorie", data => this.recipe.Engredients.push({Name: data, Positions: []}), "Nazwa kategorii");
  }

  addEngredient(index){
    this.addingToGroup = index;
    this.newEngredient = {Name: null, Qty: null, Unit: null};
  }

  saveEngredient(index){
    this.recipe.Engredients[index].Positions.push(this.newEngredient);
    this.addEngredient(index)
  }

  cancelAddingEngredient() {
    this.newEngredient = null;
    this.addingToGroup = null;
  }

}
