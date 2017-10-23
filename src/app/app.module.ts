import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {ComponentsModule} from "../components/components.module";
import { FireProvider } from '../providers/fire/fire';
import {CategoriesPage} from "../pages/categories/categories";


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
    ContactPage,
    HomePage,
    TabsPage,
    CategoriesPage
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
    ContactPage,
    HomePage,
    TabsPage,
    CategoriesPage
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
