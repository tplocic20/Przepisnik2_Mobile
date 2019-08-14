import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/map';
// import {AngularFireAuth} from "angularfire2/auth";
// import {AngularFireDatabase} from "angularfire2/database";
// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// import {MessagesProvider} from "./messages";
// import {Storage} from "@ionic/storage";
// import {Note} from "../models/Note";
// import {Recipe} from "../models/Recipe";
// import {Observable} from "  rxjs";
//
@Injectable()
export class FireProvider {
//
//   private authState = null;
//   authCtx: Observable<any> = null;
//
//   constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private msg: MessagesProvider, private storage: Storage) {
//     this.authCtx = this.auth.authState;
//     this.auth.authState.subscribe(user => {
//       if (user) {
//         this.authState = user;
//
//         this.userRef = this.db.object("Users/" + user.uid);
//         this.userObj = this.userRef.valueChanges();
//
//         this.categoriesRef = this.db.list(`Categories/${user.uid}`);
//         this.categoriesList = this.categoriesRef.snapshotChanges().map(actions => this.mapWithKey(actions));
//
//         this.recipesRef = this.db.list(`Recipes/${user.uid}`);
//         this.recipesList = this.recipesRef.snapshotChanges().map(actions => this.mapWithKey(actions));
//
//         this.favouritesRef = this.db.list(`Recipes/${user.uid}`, query => query.orderByChild('Favourite').equalTo(true));
//         this.favouritesList = this.favouritesRef.snapshotChanges().map(actions => this.mapWithKey(actions));
//
//         this.notesRef = this.db.list(`Notes/${user.uid}`);
//         this.notesList = this.notesRef.snapshotChanges().map(actions => this.mapWithKey(actions));
//
//         this.unitsRef = this.db.list(`Units/${user.uid}`);
//         this.unitsList = this.unitsRef.snapshotChanges().map(actions => this.mapWithKey(actions));
//       }
//     });
//   }
//
//   private unitsRef: any;
//   private unitsList: Observable<any>;
//
//   private categoriesRef: any;
//   public categoriesList: Observable<any>;
//
//   private recipesRef: any;
//   private recipesList: Observable<any>;
//
//   private favouritesRef: any;
//   private favouritesList: Observable<any>;
//
//   private notesRef: any;
//   private notesList: Observable<any>;
//
//   private userRef = null;
//   private userObj = null;
//
//   private imagesRef = firebase.storage();
//
//
//   private unitsLoaded: Observable<any[]>;
//
//   get units() {
//     if (!this.unitsLoaded)
//       this.unitsLoaded = this.getUnits();
//     return this.unitsLoaded;
//   }
//
//   private categoriesLoaded: Observable<any[]>;
//
//   get categories() {
//     if (!this.categoriesLoaded) {
//       this.categoriesLoaded = this.getCategories();
//     }
//     return this.categoriesLoaded;
//   }
//
//
//   get isSignedIn() {
//     return this.authState != null;
//   }
//
//   get userName() {
//     return this.authState != null ? (this.authState.displayName ? this.authState.displayName : this.authState.email) : null;
//   }
//
//   public autoSignIn() {
//     console.log("auto sign in");
//     return this.storage.get('credentials').then(c => {
//       if (c) {
//         const d = JSON.parse(atob(c));
//         return this.signIn(d.e, d.p).then(() => {
//           return true;
//         }, () => {
//           return false
//         });
//       }
//     }, () => {
//       return false;
//     });
//   }
//
//   public rememberMe(email, pass) {
//     const credentials = {
//       e: email,
//       p: pass
//     };
//     const encoded = btoa(JSON.stringify(credentials));
//     console.log(encoded);
//     this.storage.set('credentials', encoded);
//   }
//
//   public signIn(email, pass) {
//     return this.auth.auth.signInWithEmailAndPassword(email, pass);
//   }
//
//   public signOut() {
//     this.storage.remove('credentials');
//     this.authState = null;
//     return this.auth.auth.signOut();
//   }
//
//   private mapWithKey(actions) {
//     let list = [];
//     actions.forEach(action => {
//       const $key = action.payload.key;
//       list.push({$key, ...action.payload.val()});
//     });
//     return list;
//   }
//
//   private newGuid() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   }
//
//   getCategories() {
//     if (!this.categoriesList) return null;
//     return this.categoriesList.map(res => {
//       return res;
//     })
//   }
//
//   addCategory(data) {
//     this.categoriesRef.push({Name: data}).then(() => this.msg.toast.info(`Kategoria ${data} została dodana`), error => this.msg.toast.error(error));
//   }
//
//   removeCategory(data) {
//     this.categoriesRef.remove(data.$key).then(() => this.msg.toast.info(`Kategoria ${data.Name} została usunięta`), error => this.msg.toast.error(error));
//   }
//
//   editCategory(data) {
//     this.categoriesRef.update(data.$key, {Name: data.Name}).then(() => this.msg.toast.info(`Kategoria ${data.Name} została zapisana`), error => this.msg.toast.error(error));
//   }
//
//   getNotes() {
//     this.msg.loading.show("Pobieranie danych");
//     return this.notesList.map(res => {
//       this.msg.loading.close();
//       return res;
//     })
//   }
//
//   getNote(noteId) {
//     return this.db.object(`Notes/${this.authState.uid}/${noteId}`).valueChanges();
//   }
//
//   addNote(note: Note) {
//     return this.notesRef.push(note);
//   }
//
//   updateNote(key, note: Note) {
//     return this.notesRef.update(key, note);
//   }
//
//   removeNote(key) {
//     return this.notesRef.remove(key);
//
//   }
//
//   getFavourites() {
//     return this.favouritesList.map(res => {
//       return res;
//     });
//   }
//
//   getRecipes(categoryId, searchCall = false) {
//     if (!searchCall) {
//       this.msg.loading.show("Pobieranie danych");
//     }
//     return this.recipesList.map(data => {
//       this.msg.loading.close();
//       return data.filter(x => x.Categories.indexOf(categoryId || "") > -1)
//     })
//   }
//
//   addRecipe(recipe: Recipe) {
//     return this.recipesRef.push(recipe);
//   }
//
//   updateRecipe(key, recipe: Recipe) {
//     return this.recipesRef.update(key, recipe);
//   }
//
//   removeRecipe(key) {
//     return this.recipesRef.remove(key);
//   }
//
//   getRecipe(recipeId) {
//     return this.db.object(`Recipes/${this.authState.uid}/${recipeId}`).valueChanges();
//   }
//
//   uploadImage(imageData, contentType) {
//     return this.imagesRef.ref(this.newGuid()).putString(imageData, 'base64', {contentType: contentType});
//   }
//
//   removeImage(imageKey: string) {
//     return this.imagesRef.ref(imageKey).delete();
//   }
//
//   getUnits() {
//     return this.unitsList.map(data => data);
//   }
//
//   addUnit(unit) {
//     return this.unitsRef.push(unit);
//   }
//
//   updateUnit(key, unit) {
//     return this.unitsRef.update(key, unit);
//   }
//
//   removeUnit(key) {
//     return this.unitsRef.remove(key);
//   }
}
