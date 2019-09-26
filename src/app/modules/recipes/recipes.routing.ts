import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CategoriesPage} from "./categories/categories";
import {RecipeListPage} from "./recipe-list/recipe-list";

const routes: Routes = [
  {
    path: '',
    component: RecipeListPage
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
