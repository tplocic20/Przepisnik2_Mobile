import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FireProvider} from "../../../providers/fire";
import {NoteDetailsPage} from "../note-details/note-details";
import {AddEditNoteModal} from "../modals/add-edit-note-modal/add-edit-note-modal";
import {MessagesProvider} from "../../../providers/messages";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private viewCtrl: ViewController, private msg: MessagesProvider) {
  }

  ionViewDidLoad() {
    this.notes = this.srv.getNotes();
  }

  noteClicked(note){
    this.navCtrl.push(NoteDetailsPage, {noteId: note.$key});
  }

  noteEdit(note){
    const modal = this.modalCtrl.create(AddEditNoteModal, {noteId: note.$key}, {cssClass: 'modal-full'});
    modal.present();
  }

  noteRemove(note) {
    this.msg.alert.confirm('Usuń ' + note.Name, () => this.srv.removeNote(note.$key), 'Czy na pewno chcesz usunąć notatkę?' +
      '\nOperacji nie można cofnąć');
  }

  addNote(){
    const modal = this.modalCtrl.create(AddEditNoteModal, {noteId: null}, {cssClass: 'modal-full'});
    modal.present();
  }

}
