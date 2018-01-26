import { NgModule } from '@angular/core';
import { CommonListElementComponent } from './common-list-element/common-list-element';
import {IonicModule} from "ionic-angular";
import {HeaderPopoverComponent} from "./header-popover/header-popover";
import {HeaderPopoverButtonComponent} from "./header-popover-button/header-popover-button";

@NgModule({
	declarations: [ CommonListElementComponent, HeaderPopoverComponent, HeaderPopoverButtonComponent ],
  imports: [ IonicModule.forRoot([ CommonListElementComponent ])],
  entryComponents: [HeaderPopoverComponent],
	exports: [ CommonListElementComponent, HeaderPopoverComponent, HeaderPopoverButtonComponent  ]
})
export class ComponentsModule {}
