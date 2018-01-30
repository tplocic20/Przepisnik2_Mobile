import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Storage} from "@ionic/storage";

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private storage: Storage) {
    this.storage.get('theme').then((val) => {
      if (val)
        this.theme.next(val);
    });
  }

  setActiveTheme(val) {
    this.storage.set('theme', val);
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }
}
