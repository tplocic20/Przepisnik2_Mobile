import {Component} from '@angular/core';
import {NavParams} from "@ionic/angular";

@Component({
  selector: 'engredients-fraction-popover',
  templateUrl: 'engredients-fraction-popover.html'
})
export class EngredientsFractionPopoverComponent {

  portion: any;
  updateFn: any;

  constructor(public navParams: NavParams) {
    this.portion = this.navParams.get('portion');
    this.updateFn = this.navParams.get('updateFn');
  }

  onChange() {
    this.updateFn(this.portion);
  }

  close() {
  }
}
