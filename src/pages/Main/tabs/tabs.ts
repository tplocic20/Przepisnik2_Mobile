import { Component } from '@angular/core';
import {FavouritesPage} from "../../favourites/favourites";
import {CategoriesPage} from "../../Recipes/categories/categories";
import {NoteListPage} from "../../Notes/note-list/note-list";
import {FireProvider} from "../../../providers/fire";
import {SettingsRootPage} from "../../Settings/settings-root/settings-root";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavouritesPage;
  tab2Root = CategoriesPage;
  tab3Root = NoteListPage;
  tab4Root = SettingsRootPage;

  constructor(private srv: FireProvider) {

  }

  ionViewCanEnter() {
    return this.srv.isSignedIn;
  }
}
