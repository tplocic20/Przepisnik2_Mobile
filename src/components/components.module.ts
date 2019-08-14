import {NgModule} from '@angular/core';
import {CommonListElementComponent} from './common-list-element/common-list-element';
import {IonicModule} from "@ionic/angular";
import {HeaderPopoverComponent} from "./header-popover/header-popover";
import {HeaderPopoverButtonComponent} from "./header-popover-button/header-popover-button";
import {EngredientsFractionPopoverComponent} from './engredients-fraction-popover/engredients-fraction-popover';

@NgModule({
  declarations: [
    CommonListElementComponent,
    HeaderPopoverComponent,
    HeaderPopoverButtonComponent,
    EngredientsFractionPopoverComponent,
  ],
  imports: [],
  entryComponents: [
    HeaderPopoverComponent,
    EngredientsFractionPopoverComponent,
  ],
  exports: [
    CommonListElementComponent,
    HeaderPopoverComponent,
    HeaderPopoverButtonComponent,
    EngredientsFractionPopoverComponent,
  ]
})
export class ComponentsModule {
}
