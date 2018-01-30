import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {FireProvider} from "../../../providers/fire";
import {MessagesProvider} from "../../../providers/messages";
import {AddEditNoteModal} from "../modals/add-edit-note-modal/add-edit-note-modal";
import {ShareProvider} from "../../../providers/share";
import {Note} from "../../../models/Note";

@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html',
})
export class NoteDetailsPage {

  note: Note;
  noteId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private srv: FireProvider, private modalCtrl: ModalController, private msg: MessagesProvider, private shareProvider: ShareProvider) {
  }

  ionViewDidLoad() {
    this.noteId = this.navParams.get('noteId');
    this.srv.getNote(this.noteId).subscribe(res => this.note = res);
  }

  noteEdit() {
    const modal = this.modalCtrl.create(AddEditNoteModal, {noteId: this.noteId}, {cssClass: 'modal-full'});
    modal.present();
  }

  noteRemove() {
    this.msg.alert.confirm('Usuń ' + this.note.Name, () => this.navCtrl.pop().then(() => this.srv.removeNote(this.noteId)), 'Czy na pewno chcesz usunąć notatkę?' +
      '\nOperacji nie można cofnąć');
  }

  share() {
    this.shareProvider.share(this.note);
  }

}
