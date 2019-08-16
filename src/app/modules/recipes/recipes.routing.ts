import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CategoriesPage} from "./categories/categories";

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRouting {
}
