import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { NumberPartPipe } from './number-part/number-part';
import { OrderByPropertiesPipe } from './order-by-properties/order-by-properties';
@NgModule({
	declarations: [FilterPipe,
    NumberPartPipe,
    OrderByPropertiesPipe,
    ],
	imports: [],
	exports: [FilterPipe,
    NumberPartPipe,
    OrderByPropertiesPipe,
    ]
})
export class PipesModule {}
