import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {MessagesProvider} from "./messages";

/*
  Generated class for the FireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireProvider {


  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private msg: MessagesProvider) {
    this.signIn();
  }

  private categoriesRef = this.db.list("Categories");
  private categoriesList = this.categoriesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private recipesRef = this.db.list("Recipes");
  private recipesList = this.recipesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private favouritesRef = this.db.list("Recipes", query => query.orderByChild('Favourite').equalTo(true));
  private favouritesList = this.favouritesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private notesRef = this.db.list("Notes");
  private notesList = this.notesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private imagesRef = firebase.storage();


  private signIn() {
    return this.auth.auth.signInAnonymously();
  }

  private mapWithKey(actions) {
    let list = [];
    actions.forEach(action => {
      const $key = action.payload.key;
      list.push({$key, ...action.payload.val()});
    })
    return list;
  }


  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getCategories() {
    this.msg.loading.show("Pobieranie danych");
    return this.categoriesList.map(res => {
      this.msg.loading.close();
      return res;
    })
  }

  addCategory(data) {
    this.categoriesRef.push({Name: data}).then(() => this.msg.toast.info(`Kategoria ${data} została dodana`), error => this.msg.toast.error(error));
  }

  removeCategory(data) {
    this.categoriesRef.remove(data.$key).then(() => this.msg.toast.info(`Kategoria ${data.Name} została usunięta`), error => this.msg.toast.error(error));
  }

  editCategory(data) {
    this.categoriesRef.update(data.$key, {Name: data.Name}).then(()=> this.msg.toast.info(`Kategoria ${data.Name} została zapisana`), error => this.msg.toast.error(error));
  }

  getNotes() {
    return this.notesList.map(res => {
      return res;
    })
  }

  getFavourites() {
    return this.favouritesList.map(res => {
      return res;
    });
  }

  getRecipes(categoryId) {
    return this.recipesList.map(data => {
      return data.filter(x => x.Categories.indexOf(categoryId || "") > -1)
    })
  }

  updateRecipe(recipe, key) {
    return this.recipesRef.update(key, recipe);
  }

  getRecipe(recipeId) {
    return this.db.object(`Recipes/${recipeId}`).valueChanges();
  }

  uploadImage(imageData, contentType) {
    return this.imagesRef.ref(this.newGuid()).putString(imageData, 'base64', {contentType: contentType});
  }

  removeImage(imageKey: string) {
    return this.imagesRef.ref(imageKey).delete();
  }
}
