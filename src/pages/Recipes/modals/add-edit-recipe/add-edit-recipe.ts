import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController, AlertController} from 'ionic-angular';
import {Recipe} from "../../../../models/Recipe";
import {FireProvider} from "../../../../providers/fire";
import {MessagesProvider} from "../../../../providers/messages";
import {AddEditEngredientGroupModal} from "../add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModal} from "../add-edit-engredient-modal/add-edit-engredient-modal";
import {Slide, SlideLeft, SlideRight} from "../../../../theme/animations/animations";

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
              private viewCtrl: ViewController, private platform: Platform) {
    this.categories = this.srv.getCategories();
  }


  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.recipeId = this.navParams.get('recId');
    if (this.recipeId) {
      this.srv.getRecipe(this.recipeId).subscribe((res: Recipe) => {
        this.recipe = res;
        this.selectedCategories = this.recipe.Categories.split(',');
      });
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
    this.msg.alert.input("Nowa kategoria", data => this.srv.addCategory(data), "Nazwa kategorii");
  }

  addEngredientCategory() {
    const modal = this.modalCtrl.create(AddEditEngredientGroupModal, null, {cssClass: 'modal-xsmall'});
    modal.onDidDismiss(data => {
      if (data) {
        this.recipe.Engredients.push({Name: data, Positions: []});
      }
    });
    modal.present();
  }

  editEngredientCategory(cat) {
    const modal = this.modalCtrl.create(AddEditEngredientGroupModal, {value: cat.Name}, {cssClass: 'modal-xsmall'});
    modal.onDidDismiss(data => {
      if (data) {
        cat.Name = data;
      }
    });
    modal.present();
  }

  removeEngredientCategory(cat, index) {
    this.msg.alert.confirm("Usuwanie " + cat.Name, () => this.recipe.Engredients.splice(index, 1), "Czy na pewno chcesz usunąc kategorię? Operacji nie da się cofnąć");
  }

  addEngredient() {
    const modal = this.modalCtrl.create(AddEditEngredientModal, null, {cssClass: 'modal-small'});
    modal.onDidDismiss(data => {
      if (data) {
        this.recipe.Engredients[this.selectedEngredientGroup].Positions.push(data);
      }
    });
    modal.present();

  }

  editEngredient(groupIdx, engIdx, eng) {
    const modal = this.modalCtrl.create(AddEditEngredientModal, eng, {cssClass: 'modal-small'});
    modal.onDidDismiss(data => {
      if (data) {
        this.recipe.Engredients[groupIdx].Positions[engIdx] = data;
      }
    });
    modal.present();
  }

  removeEngredient(groupIdx, engIdx, eng) {
    this.msg.alert.confirm("Usuwanie " + eng.Name, () => this.recipe.Engredients[groupIdx].Positions.splice(engIdx, 1), "Czy na pewno chcesz usunąc składnik? Operacji nie da się cofnąć");
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
        this.srv.updateRecipe(this.recipeId, this.recipe).then(() => {
          this.msg.toast.info("Przepis zaaktualizowany");
          this.navCtrl.pop();
        });
      } else {
        this.srv.addRecipe(this.recipe).then(() => {
          this.msg.toast.info("Przepis dodany");
          this.navCtrl.pop();
        });
      }
    }
  }

  discardChanges() {
    this.msg.alert.confirm('', () => this.viewCtrl.dismiss(), 'Czy na pewno chcesz anulować zmiany');
  }

  public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
    }, 10);
  }

  private customHandleBackButton(): void {
    this.discardChanges();
  }
}
