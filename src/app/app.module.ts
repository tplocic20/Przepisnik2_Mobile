import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {ComponentsModule} from "../components/components.module";
import { FireProvider } from '../providers/fire';
import {CategoriesPage} from "../pages/categories/categories";
import {FavouritesPage} from "../pages/favourites/favourites";
import {NoteListPage} from "../pages/note-list/note-list";
import {RecipeListPage} from "../pages/recipe-list/recipe-list";
import {RecipeDetailsPage} from "../pages/recipe-details/recipe-details";
import {ImagePreviewPage} from "../pages/image-preview/image-preview";


var fireBaseConfig = {
  apiKey: "AIzaSyAIHYAHC6ykzoTnO25vEpxwkXm9_fS_Jeo",
  authDomain: "przepisnik.firebaseapp.com",
  databaseURL: "https://przepisnik.firebaseio.com",
  projectId: "firebase-przepisnik",
  storageBucket: "firebase-przepisnik.appspot.com",
  messagingSenderId: "457833981759"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    CategoriesPage,
    FavouritesPage,
    NoteListPage,
    RecipeListPage,
    RecipeDetailsPage,
    ImagePreviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    CategoriesPage,
    FavouritesPage,
    NoteListPage,
    RecipeListPage,
    RecipeDetailsPage,
    ImagePreviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireProvider
  ]
})
export class AppModule {}
