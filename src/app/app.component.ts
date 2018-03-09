import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SettingsProvider} from "../providers/settings";
import {StartPage} from "../pages/Main/start/start";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = StartPage;
  selectedTheme: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, settings: SettingsProvider) {
    settings.getActiveTheme().subscribe(theme => this.selectedTheme = theme);
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
