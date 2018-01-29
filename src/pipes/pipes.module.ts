import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { NumberPartPipe } from './number-part/number-part';
@NgModule({
	declarations: [FilterPipe,
    NumberPartPipe],
	imports: [],
	exports: [FilterPipe,
    NumberPartPipe]
})
export class PipesModule {}
