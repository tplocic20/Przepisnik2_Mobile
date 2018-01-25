import {Component, ViewChild} from '@angular/core';
import {Keyboard, ModalController, NavController, NavParams, Slides, ViewController} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {MessagesProvider} from "../../providers/messages";
import {AddEditEngredientGroupModalPage} from "../../modals/add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModalPage} from "../../modals/add-edit-engredient-modal/add-edit-engredient-modal";
import {Recipe} from "../../models/Recipe";

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

  private recipe: Recipe = {Name: ""};
  private recipeId: string;
  private selectedCategories = [];
  private categories: any;
  private activeSlide: string = "0";
  private textareaFocused: boolean = false;
  private selectedEngredientGroup: number = 0;
  private firstSlideValid: boolean = true;
  private secondSlideValid: boolean = true;
  private thirdSlideValid: boolean = true;
  private nameValid: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider, private modalCtrl: ModalController,
              private keyboard: Keyboard, private viewCtrl: ViewController) {
    this.categories = this.srv.getCategories();
  }

  ionViewDidLoad() {
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

  keyboardClosed() {
    if (this.textareaFocused) {
      this.msg.toast.info('k');
    }
  }

  onSlideChanged() {
    const idx = this.slides.getActiveIndex();
    this.activeSlide = idx.toString();
  }

  onSegmentChanged(ev) {
    this.slides.slideTo(ev.value);
  }

  addCategory() {
    this.msg.alert.input("Nowa kategoria", data => this.srv.addCategory(data), "Nazwa kategorii");
  }

  addEngredientCategory() {
    const modal = this.modalCtrl.create(AddEditEngredientGroupModalPage, null, {cssClass: 'modal-xsmall'});
    modal.onDidDismiss(data => {
      if (data) {
        this.recipe.Engredients.push({Name: data, Positions: []});
      }
    });
    modal.present();
  }

  editEngredientCategory(cat) {
    const modal = this.modalCtrl.create(AddEditEngredientGroupModalPage, {value: cat.Name}, {cssClass: 'modal-xsmall'});
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
    const modal = this.modalCtrl.create(AddEditEngredientModalPage, null, {cssClass: 'modal-small'});
    modal.onDidDismiss(data => {
      if (data) {
        this.recipe.Engredients[this.selectedEngredientGroup].Positions.push(data);
      }
    });
    modal.present();

  }
  editEngredient(groupIdx, engIdx, eng) {
    const modal = this.modalCtrl.create(AddEditEngredientModalPage, eng, {cssClass: 'modal-small'});
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
    this.msg.alert.confirm('', ()=>this.viewCtrl.dismiss(), 'Czy na pewno chcesz anulować zmiany');

  }
}
