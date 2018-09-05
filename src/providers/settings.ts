import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Storage} from "@ionic/storage";
import {MessagesProvider} from "./messages";

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<string> = new BehaviorSubject("");
  popoverOptions: boolean;
  private saveTimeout;

  constructor(private storage: Storage, private msg: MessagesProvider) {
    this.storage.get('theme').then((val) => {
      if (val)
        this.theme.next(val);
    });
    this.storage.get('popoverOptions').then(res => {
      this.popoverOptions = res;
    }).catch(() => this.popoverOptions = false);
  }

  setActiveTheme(val) {
    this.storage.set('theme', val);
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  setPopoverOptions(val){
    if (this.saveTimeout)
      clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.storage.set('popoverOptions', val).then(() =>{
        this.msg.toast.info("Zaaktualizowano ustawienia");
      });
    }, 1000);
  }
}
