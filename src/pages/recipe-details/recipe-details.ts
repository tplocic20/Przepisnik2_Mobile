import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {ImagePreviewPage} from "../image-preview/image-preview";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage {

  @ViewChild(Slides) slides: Slides;
  activeSlide: string = "0";
  recipe: any;
  recId: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private cam: Camera) {
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

  showImage(image) {
    const modal = this.modalCtrl.create(ImagePreviewPage, {url: image});
    modal.present();
  }

  addImageUrl() {
  }

  addImageFile() {

  }

  addImageCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
    }
    this.cam.getPicture(options).then(imageData => {
      let newPhoto = {url: "", isUploading: true};
      if (this.recipe.Gallery) {
        this.recipe.Gallery = [newPhoto, ...this.recipe.Gallery];
      }
      else {
        this.recipe.Gallery = [newPhoto];
      }
      this.srv.uploadImage(imageData, "image/jpeg").then(savedPicture => {
          newPhoto.url = savedPicture.downloadURL;
          delete newPhoto.isUploading;
          this.srv.updateRecipe(this.recipe, this.recId);
        }
      )
    }, err => this.cam.cleanup()).catch(err => this.cam.cleanup());
  }
}
