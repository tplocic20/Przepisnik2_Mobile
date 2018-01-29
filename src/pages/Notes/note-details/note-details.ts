import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FireProvider} from "../../../providers/fire";

/**
 * Generated class for the NoteDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html',
})
export class NoteDetailsPage {

  note: any;
  noteId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider) {
  }

  ionViewDidLoad() {
    this.noteId = this.navParams.get('noteId');
    this.srv.getNote(this.noteId).subscribe(res => this.note = res);
  }

  noteEdit() {

  }

  noteRemove() {

  }

  share() {

  }
}
