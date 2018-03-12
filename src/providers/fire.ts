import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {MessagesProvider} from "./messages";
import {Storage} from "@ionic/storage";
import {Note} from "../models/Note";
import {Recipe} from "../models/Recipe";
import {ObserveOnMessage} from "rxjs/operator/observeOn";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FireProvider {

  private authState = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private msg: MessagesProvider, private storage: Storage) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authState = user;
      }
    });
  }

  private categoriesRef = this.db.list("Categories");
  private categoriesList = this.categoriesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private recipesRef = this.db.list("Recipes");
  private recipesList = this.recipesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private favouritesRef = this.db.list("Recipes", query => query.orderByChild('Favourite').equalTo(true));
  private favouritesList = this.favouritesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private notesRef = this.db.list("Notes");
  private notesList = this.notesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private unitsRef = this.db.list("Units");
  private unitsList = this.unitsRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private imagesRef = firebase.storage();


  private unitsLoaded: Observable<any[]>;

  get units() {
    if (!this.unitsLoaded)
      this.unitsLoaded = this.getUnits();
    return this.unitsLoaded;
  }

  private categoriesLoaded: Observable<any[]>;
  get categories() {
    if (!this.categoriesLoaded) {
      this.msg.loading.show("Pobieranie danych");
      this.categoriesLoaded = this.getCategories();
    }
    this.msg.loading.close();
    return this.categoriesLoaded;
  }



  get isSignedIn() {
    return this.authState != null;
  }

  get userName() {
    return this.authState != null ? (this.authState.displayName ? this.authState.displayName : this.authState.email) : null;
  }

  public autoSignIn() {
    console.log("auto sign in");
    return this.storage.get('credentials').then(c => {
      if (c) {
        const d = JSON.parse(atob(c));
        return this.signIn(d.e, d.p).then(() => {
          return true;
        }, () => {
          return false
        });
      }
    }, () => {
      return false;
    });
  }

  public rememberMe(email, pass) {
    const credentials = {
      e: email,
      p: pass
    };
    const encoded = btoa(JSON.stringify(credentials));
    console.log(encoded);
    this.storage.set('credentials', encoded);
  }

  public signIn(email, pass) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public signOut() {
    this.storage.remove('credentials');
    this.authState = null;
    return this.auth.auth.signOut();
  }

  private mapWithKey(actions) {
    let list = [];
    actions.forEach(action => {
      const $key = action.payload.key;
      list.push({$key, ...action.payload.val()});
    });
    return list;
  }

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getCategories() {
    if (!this.categoriesList) return null;
    // this.msg.loading.show("Pobieranie danych");
    return this.categoriesList.map(res => {
      // this.msg.loading.close();
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
    this.categoriesRef.update(data.$key, {Name: data.Name}).then(() => this.msg.toast.info(`Kategoria ${data.Name} została zapisana`), error => this.msg.toast.error(error));
  }

  getNotes() {
    this.msg.loading.show("Pobieranie danych");
    return this.notesList.map(res => {
      this.msg.loading.close();
      return res;
    })
  }

  getNote(noteId) {
    return this.db.object(`Notes/${noteId}`).valueChanges();
  }

  addNote(note: Note) {
    return this.notesRef.push(note);
  }

  updateNote(key, note: Note) {
    return this.notesRef.update(key, note);
  }

  removeNote(key) {
    return this.notesRef.remove(key);

  }

  getFavourites() {
    return this.favouritesList.map(res => {
      return res;
    });
  }

  getRecipes(categoryId) {
    this.msg.loading.show("Pobieranie danych");
    return this.recipesList.map(data => {
      this.msg.loading.close();
      return data.filter(x => x.Categories.indexOf(categoryId || "") > -1)
    })
  }

  addRecipe(recipe: Recipe) {
    return this.recipesRef.push(recipe);
  }

  updateRecipe(key, recipe: Recipe) {
    return this.recipesRef.update(key, recipe);
  }

  removeRecipe(key) {
    return this.recipesRef.remove(key);
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

  getUnits() {
    return this.unitsList.map(data => data);
  }

  addUnit(unit) {
    return this.unitsRef.push(unit);
  }

  updateUnit(key, unit) {
    return this.unitsRef.update(key, unit);
  }

  removeUnit(key) {
    return this.unitsRef.remove(key);
  }
}
