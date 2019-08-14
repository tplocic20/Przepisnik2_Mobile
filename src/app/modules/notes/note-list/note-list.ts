import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {FireProvider} from "../../../../providers/fire";
import {NoteDetailsPage} from "../note-details/note-details";
import {AddEditNoteModal} from "../modals/add-edit-note-modal/add-edit-note-modal";
import {MessagesProvider} from "../../../../providers/messages";

@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {

  notes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private msg: MessagesProvider) {
  }

  ionViewDidLoad() {
  }

  noteClicked(note){
  }

  noteEdit(note){
  }

  noteRemove(note) {
  }

  addNote(){
  }

}
