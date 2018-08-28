import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, PopoverController, Slides} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {Collapse} from "../../../theme/animations/animations";
import {Recipe} from "../../../models/Recipe";
import {FireProvider} from "../../../providers/fire";
import {MessagesProvider} from "../../../providers/messages";
import {ImagePreviewModal} from "../modals/image-preview/image-preview";
import {AddEditRecipeModal} from "../modals/add-edit-recipe/add-edit-recipe";
import {ShareProvider} from "../../../providers/share";
import {EngredientsFractionPopoverComponent} from "../../../components/engredients-fraction-popover/engredients-fraction-popover";
import {Insomnia} from "@ionic-native/insomnia";
import {GenerateNoteModal} from "../../Notes/modals/generate-note-modal/generate-note-modal";

@Component({
  selector: 'page-recipe-details',
  animations: [Collapse(500)],
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage {

  @ViewChild(Slides) slides: Slides;
  activeSlide: string = "0";
  recipe: Recipe;
  recId: any;
  title: any;
  selectedImages = [];
  isCookMode: boolean = false;
  isFavouritesDisabled: boolean = false;
  portionPart: number = 100;
  cookModeTimeout = null;

  constructor(public navParams: NavParams, public navCtrl: NavController, private srv: FireProvider, private modalCtrl: ModalController, private cam: Camera, private fileChooser: FileChooser, private msg: MessagesProvider,
              private shareProv: ShareProvider, private popoverCtrl: PopoverController, private insomnia: Insomnia) {
  }

  ionViewDidLoad() {
    this.recId = this.navParams.get('recId');
    this.title = this.navParams.get('recName');
    this.srv.getRecipe(this.recId).subscribe(res => this.recipe = res);
    this.insomnia.keepAwake();
  }

  ionViewWillLeave() {
    this.insomnia.allowSleepAgain();
  }

  onSlideChanged() {
    const idx = this.slides.getActiveIndex();
    this.activeSlide = idx.toString();
  }

  onSegmentChanged(ev) {
    this.slides.slideTo(ev.value);
  }

  switchCookMode() {
    this.isCookMode = !this.isCookMode;
    if (this.isCookMode) { // właśnie włączono
      if (this.cookModeTimeout) {
        clearTimeout(this.cookModeTimeout);
      }
    } else { // właśnie wyłączono
      this.cookModeTimeout = setTimeout(() => {
        this.resetCookMode();
      }, 30 * 1000);
    }
    this.msg.toast.info("Tryb szefa kuchni " + (this.isCookMode ? "aktywny" : "nieaktywny"));
  }

  private resetCookMode() {
    this.recipe.Engredients.forEach((group)=> {
      group.Positions.forEach((pos:any) => {
        pos.isUsed = false;
      })
    })
  }

  showImage(image) {
    if (this.selectedImages.length > 0) return;
    const modal = this.modalCtrl.create(ImagePreviewModal, {url: image}, {cssClass: 'modal-full'});
    modal.present();
  }

  addImageUrl() {
  }

  addImageFile() {
    this.fileChooser.open().then(uri => {
      alert(uri);
    }).catch(e => alert(e));
  }

  addImageCamera() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 1080,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
    };
    this.cam.getPicture(options).then(imageData => {
      let newPhoto = {id: "", url: "", isUploading: true};
      if (this.recipe.Gallery) {
        this.recipe.Gallery.push(newPhoto);
      }
      else {
        this.recipe.Gallery = [newPhoto];
      }
      this.srv.uploadImage(imageData, "image/jpeg").then(savedPicture => {
          const refs = savedPicture.ref.fullPath.split('/');
          newPhoto.url = savedPicture.downloadURL;
          newPhoto.id = refs[refs.length - 1];
          delete newPhoto.isUploading;
          this.msg.toast.info("Zdjęcie dodane");
          this.srv.updateRecipe(this.recId, this.recipe);
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

  addRemoveFromFavourites() {
    if (this.isFavouritesDisabled) return;
    this.isFavouritesDisabled = true;
    this.recipe.Favourite = !this.recipe.Favourite;
    this.srv.updateRecipe(this.recId, this.recipe).then(() => {
      if (this.recipe.Favourite) {
        this.msg.toast.info("Dodano do ulubionych");
      } else {
        this.msg.toast.info("Usunęto z ulubionych");
      }
      this.isFavouritesDisabled = false;
    }).catch(() => {
      this.isFavouritesDisabled = false;
    });
  }

  removeImages() {
    if (this.selectedImages.length > 0) {
      let newPhotos = this.recipe.Gallery.filter(item => {
        return this.selectedImages.indexOf(item.id) < 0;
      });
      this.recipe.Gallery = newPhotos;
      this.srv.updateRecipe(this.recId, this.recipe).then(() => {
        this.selectedImages.forEach(image => {
          this.srv.removeImage(image);
        });
        this.selectedImages = [];
      })
    }
  }

  recipeEdit() {
    const modal = this.modalCtrl.create(AddEditRecipeModal, {recId: this.recId}, {cssClass: 'modal-full'});
    modal.present();
  }

  recipeRemove() {
    this.msg.alert.confirm('Usuń ' + this.recipe.Name, () => this.navCtrl.pop().then(() => this.srv.removeRecipe(this.recId)), 'Czy na pewno chcesz usunąć przepis?' +
      '\nOperacji nie można cofnąć');
  }

  createNote() {
    const modal = this.modalCtrl.create(GenerateNoteModal, {recId: this.recId}, {cssClass: 'modal-full'});
    modal.present();
  }

  engredientsFraction(ev) {
    let popover = this.popoverCtrl.create(EngredientsFractionPopoverComponent, {
      portion: this.portionPart, updateFn: (data) => {
        this.portionPart = +data;
      }
    });

    popover.present({
      ev: ev
    });
  }

  share() {
    this.shareProv.share(this.recipe);
  }
}
