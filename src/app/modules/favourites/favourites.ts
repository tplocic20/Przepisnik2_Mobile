import { Component } from '@angular/core';
import {FireProvider} from "../../../providers/fire";
import {Observable} from "rxjs";

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  favourites: Observable<any[]>;
  constructor(private srv: FireProvider) {
  }

  ionViewDidLoad() {
  }

  favouriteClicked(recipe) {
  }
}
