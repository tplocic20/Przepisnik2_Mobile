import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FireProvider} from "../../providers/fire";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  favourites: Observable<any[]>;
  constructor(public navCtrl: NavController, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    this.favourites = this.srv.getFavourites();
  }

  favouriteClicked(item){
    console.log(item.Name + "  CLICKED");
  }
}
