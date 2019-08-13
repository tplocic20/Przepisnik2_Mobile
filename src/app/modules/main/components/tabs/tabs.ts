import { Component } from '@angular/core';
import {FavouritesPage} from "../../../favourites/favourites";
import {CategoriesPage} from "../../../recipes/categories/categories";
import {NoteListPage} from "../../../notes/note-list/note-list";
import {FireProvider} from "../../../../../providers/fire";
import {SettingsRootPage} from "../../../settings/settings-root/settings-root";
import {RecipeMainPage} from "../../../recipes/recipe-main/recipe-main";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavouritesPage;
  tab2Root = RecipeMainPage;
  tab3Root = NoteListPage;
  tab4Root = SettingsRootPage;

  constructor(private srv: FireProvider) {

  }

  ionViewCanEnter() {
    return this.srv.isSignedIn;
  }
}
