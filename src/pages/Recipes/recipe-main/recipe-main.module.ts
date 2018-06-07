import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeMainPage } from './recipe-main';

@NgModule({
  declarations: [
    RecipeMainPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeMainPage),
  ],
})
export class RecipeMainPageModule {}
