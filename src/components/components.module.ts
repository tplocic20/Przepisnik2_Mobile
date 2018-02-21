import { NgModule } from '@angular/core';
import { CommonListElementComponent } from './common-list-element/common-list-element';
import {IonicModule} from "ionic-angular";
import {HeaderPopoverComponent} from "./header-popover/header-popover";
import {HeaderPopoverButtonComponent} from "./header-popover-button/header-popover-button";
import { EngredientsFractionPopoverComponent } from './engredients-fraction-popover/engredients-fraction-popover';
import { CommonListOptionsComponent } from './common-list-options/common-list-options';

@NgModule({
	declarations: [ CommonListElementComponent, HeaderPopoverComponent, HeaderPopoverButtonComponent,
    EngredientsFractionPopoverComponent,
    CommonListOptionsComponent ],
  imports: [ IonicModule.forRoot([ CommonListElementComponent ])],
  entryComponents: [HeaderPopoverComponent, EngredientsFractionPopoverComponent, CommonListOptionsComponent],
	exports: [ CommonListElementComponent, HeaderPopoverComponent, HeaderPopoverButtonComponent,
    EngredientsFractionPopoverComponent,
    CommonListOptionsComponent  ]
})
export class ComponentsModule {}
