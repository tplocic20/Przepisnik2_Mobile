import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {ImagePreviewPage} from "../image-preview/image-preview";

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {

  @ViewChild(Slides) slides: Slides;
  activeSlide: string = "0";
  recipe: any;
  recId: any;
  title: any;
  gallery = ["https://www.bettys.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/a/happy-birthday-chocolate-cake-2000130_6.jpg",
    "https://www.bettys.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/a/happy-birthday-chocolate-cake-2000130_6.jpg",
    "https://www.bettys.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/a/happy-birthday-chocolate-cake-2000130_6.jpg"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.recId = this.navParams.get('recId');
    this.title = this.navParams.get('recName');
    this.srv.getRecipe(this.recId).subscribe(res => this.recipe = res);
  }

  onSlideChanged() {
    const idx = this.slides.getActiveIndex();
    this.activeSlide = idx.toString();
  }

  onSegmentChanged(ev) {
    this.slides.slideTo(ev.value);
  }

  showImage(image){
    const modal = this.modalCtrl.create(ImagePreviewPage, {url: image});
    modal.present();
  }

  addImageCamera(){

  }
}
