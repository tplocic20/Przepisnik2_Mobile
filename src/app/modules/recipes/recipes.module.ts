import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesPage} from "./categories/categories";
import {RouterModule} from "@angular/router";
import {RecipesRouting} from "./recipes.routing";
import {ComponentsModule} from "../../../components/components.module";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [CategoriesPage],
  imports: [
    CommonModule,
    RecipesRouting,
    ComponentsModule,
    IonicModule
  ]
})
export class RecipesModule { }
