import {Component, ViewChild} from '@angular/core';
import {ModalController, NavParams, Slides} from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {ImagePreviewPage} from "../image-preview/image-preview";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";

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
  selectedImages = [];

  constructor(public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private cam: Camera, private fileChooser: FileChooser) {
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
    if (this.selectedImages.length> 0) return;
    const modal = this.modalCtrl.create(ImagePreviewPage, {url: image});
    modal.present();
  }

  addImageUrl() {
  }

  addImageFile() {
    this.fileChooser.open().then(uri => {
      alert(uri);
    }).catch(e=>alert(e));
  }

  addImageCamera() {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      targetWidth: 1080,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
    };
    this.cam.getPicture(options).then(imageData => {
      let newPhoto = {id: "", url: "", isUploading: true};
      if (this.recipe.Gallery) {
        this.recipe.Gallery = [newPhoto, ...this.recipe.Gallery];
      }
      else {
        this.recipe.Gallery = [newPhoto];
      }
      this.srv.uploadImage(imageData, "image/jpeg").then(savedPicture => {
          const refs = savedPicture.ref.fullPath.split('/');
          newPhoto.url = savedPicture.downloadURL;
          newPhoto.id = refs[refs.length - 1];
          delete newPhoto.isUploading;
          this.srv.updateRecipe(this.recipe, this.recId);
        }
      )
    }, err => this.cam.cleanup()).catch(err => this.cam.cleanup());
  }

  imageTapped(image) {
    if (this.selectedImages.indexOf(image.id) > -1) {
      this.imagePressed(image);
    }
    else {
      if (this.selectedImages.length > 0) {
        this.imagePressed(image);
      }
      else {
        this.showImage(image.url);
      }
    }
  }

  imagePressed(image) {
    const idx = this.selectedImages.indexOf(image.id);
    if (idx > -1) {
      this.selectedImages.splice(idx, 1);
    } else {
      this.selectedImages.push(image.id);
    }
  }
  removeImages(){
    if (this.selectedImages.length > 0){
      let newPhotos = this.recipe.Gallery.filter(item => {
        return this.selectedImages.indexOf(item.id) < 0;
      })
      this.recipe.Gallery = newPhotos;
      this.srv.updateRecipe(this.recipe, this.recId).then(() =>{
        this.selectedImages.forEach(image => {
          this.srv.removeImage(image);
        })
        this.selectedImages = [];
      })
    }
  }
}
