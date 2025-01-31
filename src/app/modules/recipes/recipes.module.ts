import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesPage} from "./categories/categories";
import {RouterModule} from "@angular/router";
import {RecipesRouting} from "./recipes.routing";
import {ComponentsModule} from "../../../components/components.module";
import {IonicModule} from "@ionic/angular";
import {RecipeListPage} from "./recipe-list/recipe-list";
import {LayoutModule} from '../shared/layout/layout.module';



@NgModule({
  declarations: [
    CategoriesPage,
    RecipeListPage
  ],
  imports: [
    CommonModule,
    RecipesRouting,
    ComponentsModule,
    IonicModule,
    LayoutModule
  ]
})
export class RecipesModule { }
