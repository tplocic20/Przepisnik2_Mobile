import { Component, OnInit } from '@angular/core';
import {Collapse} from '../../../../../theme/animations/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [Collapse(250)]

})
export class LayoutComponent implements OnInit {

  public openMenu = false;

  constructor() { }

  ngOnInit() {}

}
