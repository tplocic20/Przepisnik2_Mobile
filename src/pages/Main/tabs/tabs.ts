import { Component } from '@angular/core';
import {FavouritesPage} from "../../favourites/favourites";
import {CategoriesPage} from "../../categories/categories";
import {NoteListPage} from "../../Notes/note-list/note-list";
import {FireProvider} from "../../../providers/fire";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavouritesPage;
  tab2Root = CategoriesPage
  tab3Root = NoteListPage;

  constructor(private srv: FireProvider) {

  }

  ionViewCanEnter() {
    return this.srv.isSignedIn;
  }
}
