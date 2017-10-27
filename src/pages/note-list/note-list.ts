import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FireProvider} from "../../providers/fire";

/**
 * Generated class for the NoteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {

  notes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    this.notes = this.srv.getNotes();
  }

  noteClicked(note){

  }

  noteEdit(note){

  }

  noteRemove(note) {

  }

}
