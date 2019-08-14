import { Component } from '@angular/core';
import {NavParams, } from '@ionic/angular';

@Component({
  selector: 'page-image-preview',
  templateUrl: 'image-preview.html',
})
export class ImagePreviewModal {

  url: string;
  constructor(  public navParams: NavParams) {
    this.url = this.navParams.get('url');
  }

  close(){
  }
}
