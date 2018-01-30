import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {ComponentsModule} from "../components/components.module";
import { FireProvider } from '../providers/fire';
import {CategoriesPage} from "../pages/categories/categories";
import {FavouritesPage} from "../pages/favourites/favourites";
import {Camera} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MessagesProvider } from '../providers/messages';
import {DirectivesModule} from "../directives/directives.module";

import { SettingsProvider } from '../providers/settings';
import {IonicStorageModule} from "@ionic/storage";
import {PipesModule} from "../pipes/pipes.module";
import {NoteListPage} from "../pages/Notes/note-list/note-list";
import {RecipeListPage} from "../pages/Recipes/recipe-list/recipe-list";
import {RecipeDetailsPage} from "../pages/Recipes/recipe-details/recipe-details";
import {ImagePreviewModal} from "../pages/Recipes/modals/image-preview/image-preview";
import {AddEditRecipeModal} from "../pages/Recipes/modals/add-edit-recipe/add-edit-recipe";
import {AddEditEngredientGroupModal} from "../pages/Recipes/modals/add-edit-engredient-group-modal/add-edit-engredient-group-modal";
import {AddEditEngredientModal} from "../pages/Recipes/modals/add-edit-engredient-modal/add-edit-engredient-modal";
import {StartPage} from "../pages/Main/start/start";
import {LoginPage} from "../pages/Main/login/login";
import {TabsPage} from "../pages/Main/tabs/tabs";
import { ShareProvider } from '../providers/share';
import {SocialSharing} from "@ionic-native/social-sharing";
import {GenerateNoteModal} from "../pages/Notes/modals/generate-note-modal/generate-note-modal";
import {NoteDetailsPage} from "../pages/Notes/note-details/note-details";
import {Insomnia} from "@ionic-native/insomnia";
import {AddEditNoteModal} from "../pages/Notes/modals/add-edit-note-modal/add-edit-note-modal";


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
    ImagePreviewModal,
    AddEditRecipeModal,
    AddEditEngredientGroupModal,
    AddEditEngredientModal,
    StartPage,
    LoginPage,
    GenerateNoteModal,
    NoteDetailsPage,
    AddEditNoteModal
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
    DirectivesModule,
    PipesModule
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
    ImagePreviewModal,
    AddEditRecipeModal,
    AddEditEngredientGroupModal,
    AddEditEngredientModal,
    StartPage,
    LoginPage,
    GenerateNoteModal,
    NoteDetailsPage,
    AddEditNoteModal
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
    ShareProvider,
    SocialSharing,
    Insomnia
  ]
})
export class AppModule {}
