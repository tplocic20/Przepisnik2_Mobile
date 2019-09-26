import { Component } from '@angular/core';
import {Collapse} from '../../../../../theme/animations/animations';


@Component({
  templateUrl: 'tabs.html',
  animations: [Collapse(250)]
})
export class TabsPage {

  public openMenu = false;

  constructor() {

  }
}
