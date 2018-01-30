import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {FireProvider} from "../../../../providers/fire";
import {Note} from "../../../../models/Note";
import {MessagesProvider} from "../../../../providers/messages";

@Component({
  selector: 'page-add-edit-note-modal',
  templateUrl: 'add-edit-note-modal.html',
})
export class AddEditNoteModal {

  noteId: string;
  note: Note = {Name: ""};
  nameValid: boolean = true;
  contentValid: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private msg: MessagesProvider, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.noteId = this.navParams.get('noteId');
    if (this.noteId){
      this.srv.getNote(this.noteId).subscribe((res: Note) => this.note = res);
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
        this.srv.updateNote(this.noteId, this.note).then(() => this.viewCtrl.dismiss());
      } else {
        this.srv.addNote(this.note).then(()=>this.viewCtrl.dismiss());
      }
    }
  }

  discardChanges() {
    this.msg.alert.confirm('', ()=>this.viewCtrl.dismiss(), 'Czy na pewno chcesz anulować zmiany');
  }

}
