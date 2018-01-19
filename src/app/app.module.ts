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
import {ImagePreviewPage} from "../modals/image-preview/image-preview";
import {Camera} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MessagesProvider } from '../providers/messages';
import {AddEditRecipePage} from "../pages/add-edit-recipe/add-edit-recipe";
import {AddEditEngredientGroupModalPage} from "../modals/add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModalPage} from "../modals/add-edit-engredient-modal/add-edit-engredient-modal";
import {DirectivesModule} from "../directives/directives.module";
import {StartPage} from "../pages/start/start";
import {LoginPage} from "../pages/login/login";
import { SettingsProvider } from '../providers/settings';
import {HeaderPopoverButtonPage} from "../pages/header-popover-button/header-popover-button";
import {HeaderPopoverPage} from "../pages/header-popover/header-popover";
import {IonicStorageModule} from "@ionic/storage";


var fireBaseConfig = {
  apiKey: "AIzaSyDlCSFFdJ2kdm8-2ZkKPZasVWHqc0bfotg",
  authDomain: "przepisnik-v2.firebaseapp.com",
  databaseURL: "https://przepisnik-v2.firebaseio.com",
  projectId: "przepisnik-v2",
  storageBucket: "przepisnik-v2.appspot.com",
  messagingSenderId: "529215752695"
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
    ImagePreviewPage,
    AddEditRecipePage,
    AddEditEngredientGroupModalPage,
    AddEditEngredientModalPage,
    StartPage,
    LoginPage,
    HeaderPopoverButtonPage,
    HeaderPopoverPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule,
    DirectivesModule
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
    ImagePreviewPage,
    AddEditRecipePage,
    AddEditEngredientGroupModalPage,
    AddEditEngredientModalPage,
    StartPage,
    LoginPage,
    HeaderPopoverButtonPage,
    HeaderPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireProvider,
    Camera,
    MessagesProvider,
    FileChooser,
    SettingsProvider,
  ]
})
export class AppModule {}
