import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, AlertController} from '@ionic/angular';
import {Recipe} from "../../../../../models/Recipe";
import {FireProvider} from "../../../../../providers/fire";
import {MessagesProvider} from "../../../../../providers/messages";
import {AddEditEngredientGroupModal} from "../add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModal} from "../add-edit-engredient-modal/add-edit-engredient-modal";
import {Slide, SlideLeft, SlideRight} from "../../../../../theme/animations/animations";

@Component({
  selector: 'page-add-edit-recipe',
  animations: [SlideRight(200), SlideLeft(500), Slide(300)],
  templateUrl: 'add-edit-recipe.html',
})
export class AddEditRecipeModal {


  private recipe: Recipe = {Name: ""};
  private recipeId: string;
  private selectedCategories = [];
  private categories: any;
  private activeSlide: string = "0";
  private beforeSlide: string = "0";
  private textareaFocused: boolean = false;
  private selectedEngredientGroup: number = 0;
  private firstSlideValid: boolean = true;
  private secondSlideValid: boolean = true;
  private thirdSlideValid: boolean = true;
  private nameValid: boolean = true;
  private slidesDirection: string = "none";
  private unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider, private modalCtrl: ModalController,
                private platform: Platform) {
  }


  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.recipeId = this.navParams.get('recId');
    if (this.recipeId) {

    }
    else {
      const cat = this.navParams.get('selectedCategory');
      if (cat) {
        this.selectedCategories.push(cat);
      }
      this.recipe.Engredients = [{Name: "Składniki", Positions: []}];
    }
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  onSegmentChanged(ev) {
    if (this.beforeSlide < this.activeSlide)
      this.slidesDirection = "next";
    if (this.beforeSlide > this.activeSlide)
      this.slidesDirection = "prev";
    this.beforeSlide = ev.value;
  }

  reorderPositions(groupIdx, indexes) {
    let element = this.recipe.Engredients[groupIdx].Positions[indexes.from];
    this.recipe.Engredients[groupIdx].Positions.splice(indexes.from, 1);
    this.recipe.Engredients[groupIdx].Positions.splice(indexes.to, 0, element);
  }

  addCategory() {
  }

  addEngredientCategory() {

  }

  editEngredientCategory(cat) {

  }

  removeEngredientCategory(cat, index) {
  }

  addEngredient() {

  }

  editEngredient(groupIdx, engIdx, eng) {

  }

  removeEngredient(groupIdx, engIdx, eng) {
  }

  addRemoveCategory(key) {

  }

  textAreaFocus() {
    this.textareaFocused = true;
  }

  textAreaBlur() {
    this.textareaFocused = false;
  }

  validateRecipe() {
    this.nameValid = true;
    this.firstSlideValid = true;
    this.secondSlideValid = true;
    this.thirdSlideValid = true;
    if (!this.recipe.Name) {
      this.nameValid = false;
    }
    if (this.selectedCategories.length == 0) {
      this.firstSlideValid = false;
    }
    let engredients = [];
    this.recipe.Engredients.map(val => {
      engredients = engredients.concat(val.Positions);
    });
    if (this.recipe.Engredients.length == 0 || engredients.length == 0) {
      this.secondSlideValid = false;
    }
    if (!this.recipe.Recipe) {
      this.thirdSlideValid = false;
    }
  }

  get recipeValid() {
    return this.nameValid && this.firstSlideValid && this.secondSlideValid && this.thirdSlideValid;
  }

  saveChanges() {
    this.validateRecipe();
    if (this.recipeValid) {
      this.recipe.Categories = this.selectedCategories.toString();
      if (this.recipeId) {

      } else {

      }
    }
  }

  discardChanges() {
  }

  public initializeBackButtonCustomHandler(): void {

  }

  private customHandleBackButton(): void {
    this.discardChanges();
  }
}
