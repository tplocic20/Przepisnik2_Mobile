import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionSheetController, PopoverController} from '@ionic/angular';
import {SettingsProvider} from "../../providers/settings";

@Component({
  selector: 'common-list-element',
  templateUrl: 'common-list-element.html'
})
export class CommonListElementComponent {

  @Input() item = {Name: "Wszystkie"};
  @Input() blockSlide = false;
  @Input() enableShare = false;
  @Output() onClick = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onShare = new EventEmitter();
  private popover: any;

  constructor(private popoverCtrl: PopoverController, private actionSheet: ActionSheetController) {
  }

  itemClicked() {
    if (this.popover) {
      this.popover.dismiss();
    }
    this.onClick.emit();
  }

  async showOptions(ev) {
    ev.stopPropagation();
    await this.showActionSheet(ev);
  }

  private async showActionSheet(ev) {
    const buttons = [
      {
        text: 'Edytuj',
        cssClass: 'default-action-sheet-item',
        handler: () => {
          this.editItem();
        }
      },
      {
        text: 'Usuń',
        cssClass: 'red-action-sheet-item',
        handler: () => {
          this.removeItem()
        }
      },
      {
        text: 'Anuluj',
        role: 'cancel'
      }];
    if (this.enableShare) {
      buttons.push({
        text: 'Udostępnij',
        cssClass: 'green-action-sheet-item',
        handler: () => {
          this.shareItem();
        }
      });
    }
    const as = await this.actionSheet.create({
      header: this.item.Name,
      cssClass: 'action-sheets-basic-page',
      buttons: buttons
    });
    await as.present();
  }

  editItem() {
    this.onEdit.emit();
  }

  removeItem() {
    this.onRemove.emit();
  }

  shareItem() {
    if (this.enableShare)
      this.onShare.emit();
  }
}
