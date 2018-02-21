import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'common-list-options',
  templateUrl: 'common-list-options.html'
})
export class CommonListOptionsComponent {

  editClicked: any;
  removeClicked: any;
  shareClicked: any;
  enableShare: any;

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.editClicked = this.navParams.get('edit');
    this.removeClicked = this.navParams.get('remove');
    this.shareClicked = this.navParams.get('share');
    this.enableShare = this.navParams.get('enableShare');
  }

  editItem() {
    this.editClicked();
    this.viewCtrl.dismiss()
  }

  removeItem() {
    this.removeClicked();
    this.viewCtrl.dismiss()
  }

  shareItem() {
    if (this.enableShare)
      this.shareClicked();
    this.viewCtrl.dismiss()
  }

}
