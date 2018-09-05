import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionSheetController, Popover, PopoverController} from "ionic-angular";
import {CommonListOptionsComponent} from "../common-list-options/common-list-options";
import {SettingsProvider} from "../../providers/settings";

/**
 * Generated class for the CommonListElementComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
  private popover: Popover;

  constructor(private popoverCtrl: PopoverController, private actionSheet: ActionSheetController, private settings: SettingsProvider) {
  }

  itemClicked() {
    if (this.popover) {
      this.popover.dismiss();
    }
    this.onClick.emit();
  }

  showOptions(ev) {
    ev.stopPropagation();
    if (this.settings.popoverOptions) {
      this.showPopover(ev);
    } else {
      this.showActionSheet(ev);
    }
  }

  private showActionSheet(ev) {
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
    const as = this.actionSheet.create({
      title: this.item.Name,
      cssClass: 'action-sheets-basic-page',
      buttons: buttons
    });
    as.present();
  }

  private showPopover(ev) {
    if (this.blockSlide) return;
    this.popover = this.popoverCtrl.create(CommonListOptionsComponent, {
      edit: () => this.editItem(),
      remove: () => this.removeItem(),
      share: () => this.shareItem(),
      enableShare: this.enableShare
    });
    this.popover.present({
      ev: ev
    });
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
