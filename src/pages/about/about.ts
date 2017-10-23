import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase, dbAuth: AngularFireAuth) {
    dbAuth.auth.signInAnonymously().then(() => {
      this.items = db.list("Categories").valueChanges()
    })

  }

}
