import { Component } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {FireProvider} from "../../../../../providers/fire";
import {Note} from "../../../../../models/Note";
import {MessagesProvider} from "../../../../../providers/messages";

@Component({
  selector: 'page-add-edit-note-modal',
  templateUrl: 'add-edit-note-modal.html',
})
export class AddEditNoteModal {

  noteId: string;
  note: Note = {Name: ""};
  nameValid: boolean = true;
  contentValid: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider) {
  }

  ionViewDidLoad() {
    this.noteId = this.navParams.get('noteId');
    if (this.noteId){
    }
    console.log(this.noteId);
  }

  saveChanges() {
    this.nameValid = true;
    this.contentValid = true;
    if (!this.note.Name){
      this.nameValid = false;
    }
    if (!this.note.Content){
      this.contentValid = false;
    }
    if (this.nameValid && this.contentValid){
      if (this.noteId){
      }
    }
  }

  discardChanges() {
  }

}
