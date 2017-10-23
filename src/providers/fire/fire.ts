import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireProvider {

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.auth.auth.signInAnonymously();
  }

  getCategories() {
    if (this.auth.authState != null) {
      return this.db.list("Categories").snapshotChanges().map(actions => {
        let categories = [];
        actions.forEach(action => {
          const $key = action.payload.key;
          categories.push({$key, ...action.payload.val()});
        })
        return categories;
      })
    } else {
      this.auth.auth.signInAnonymously().then(() => {
        return this.db.list("Categories").snapshotChanges().map(actions => {
          let categories = [];
          actions.forEach(action => {
            const $key = action.payload.key;
            categories.push({$key, ...action.payload.val()});
          })
          return categories;
        })
      })
    }
  }

  addCategory(data) {
    if (this.auth.authState != null) {
      this.db.list("Categories").push({Name: data});
    } else {
      this.auth.auth.signInAnonymously().then(() => {
        this.db.list("Categories").push({Name: data});
      })
    }
  }

  removeCategory(data) {
    console.log(data);
    console.log(data.$key);
    if (this.auth.authState != null) {
      this.db.list("Categories").remove(data.$key);
    } else {
      this.auth.auth.signInAnonymously().then(() => {
        this.db.list("Categories").remove(data.$key);
      })
    }
  }

}
