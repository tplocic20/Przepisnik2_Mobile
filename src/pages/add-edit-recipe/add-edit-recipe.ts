import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {MessagesProvider} from "../../providers/messages";
import {AddEditEngredientGroupModalPage} from "../../modals/add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModalPage} from "../../modals/add-edit-engredient-modal/add-edit-engredient-modal";

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
  newEngredient: any;
  selectedEngredientGroup: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider, private modalCtrl: ModalController) {
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
    const modal = this.modalCtrl.create(AddEditEngredientGroupModalPage, null, {cssClass: 'modal-xsmall'});
    modal.onDidDismiss(data => {
      if (data){
        this.recipe.Engredients.push({Name: data, Positions: []});
      }
    });
    modal.present();
  }

  editEngredientCategory(cat) {
    const modal = this.modalCtrl.create(AddEditEngredientGroupModalPage, {value: cat.Name}, {cssClass: 'modal-xsmall'});
    modal.onDidDismiss(data => {
      if (data){
        cat.Name = data;
      }
    })
    modal.present();
  }

  removeEngredientCategory(cat, index) {
    this.msg.alert.confirm("Usuwanie "+ cat.Name, () => this.recipe.Engredients.splice(index, 1), "Czy na pewno chcesz usunąc kategorię? Operacji nie da się cofnąć");
  }

  addEngredient(){
    const modal = this.modalCtrl.create(AddEditEngredientModalPage, null, {cssClass: 'modal-small'});
    modal.onDidDismiss(data => {
      if (data){
        this.recipe.Engredients[this.selectedEngredientGroup].Positions.push(data);
      }
    });
    modal.present();

  }

  // saveEngredient(index){
  //   this.recipe.Engredients[index].Positions.push(this.newEngredient);
  //   this.addEngredient(index)
  // }
  //
  // cancelAddingEngredient() {
  //   this.newEngredient = null;
  // }

}
