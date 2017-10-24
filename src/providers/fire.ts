import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {LoadingController, ToastController} from "ionic-angular";

/*
  Generated class for the FireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireProvider {

  private loader: any;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.signIn();
  }

  private categoriesRef = this.db.list("Categories");
  private categoriesList = this.categoriesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private recipesRef = this.db.list("Recipes");
  private recipesList = this.recipesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private favouritesRef = this.db.list("Recipes", query => query.orderByChild('Favourite').equalTo(true));
  private favouritesList = this.favouritesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private signIn() {
    return this.auth.auth.signInAnonymously();
  }

  private successCallback(message: string): void {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  private errorCallback(error) {
    console.log(error);
  }

  private mapWithKey(actions) {
    let list = [];
    actions.forEach(action => {
      const $key = action.payload.key;
      list.push({$key, ...action.payload.val()});
    })
    return list;
  }

  private showLoader() {
    this.loader = this.loadingCtrl.create({content: "Pobieranie danych"});
    this.loader.present();
  }

  getCategories() {
    this.showLoader();
    return this.categoriesList.map(res => {
      this.loader.dismiss();
      return res;
    })
  }

  addCategory(data) {
    this.categoriesRef.push({Name: data}).then(() => this.successCallback(`Kategoria ${data} została dodana`), error => this.errorCallback(error));
  }

  removeCategory(data) {
    this.categoriesRef.remove(data.$key).then(() => this.successCallback(`Kategoria ${data.Name} została usunięta`), error => this.errorCallback(error));
  }

  getFavourites() {
    this.showLoader();
    return this.favouritesList.map(res => {
      this.loader.dismiss();
      return res;
    });
  }

  getRecipes(categoryId) {
    this.showLoader();
    return this.recipesList.map(data => {
      this.loader.dismiss();
      return data.filter(x => x.Categories.indexOf(categoryId || "") > -1)
    })
  }

  getRecipe(recipeId){
    return this.db.object(`Recipes/${recipeId}`).valueChanges();
  }
}
