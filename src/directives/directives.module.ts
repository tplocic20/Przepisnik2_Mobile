import { NgModule } from '@angular/core';
import { ElasticDirective } from './elastic/elastic';
import { NgVarDirective } from './ng-var/ng-var';
@NgModule({
	declarations: [ElasticDirective,
    NgVarDirective],
	imports: [],
	exports: [ElasticDirective,
    NgVarDirective]
})
export class DirectivesModule {}
