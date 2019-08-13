import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-image-preview',
  templateUrl: 'image-preview.html',
})
export class ImagePreviewModal {

  url: string;
  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.url = this.navParams.get('url');
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
