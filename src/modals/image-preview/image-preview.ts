import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ImagePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-preview',
  templateUrl: 'image-preview.html',
})
export class ImagePreviewPage {

  url: string;
  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.url = this.navParams.get('url');
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
