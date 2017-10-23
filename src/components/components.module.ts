import { NgModule } from '@angular/core';
import { CommonListElementComponent } from './common-list-element/common-list-element';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [CommonListElementComponent],
	imports: [
    IonicModule.forRoot([CommonListElementComponent])
  ],
  entryComponents: [],
	exports: [CommonListElementComponent]
})
export class ComponentsModule {}
