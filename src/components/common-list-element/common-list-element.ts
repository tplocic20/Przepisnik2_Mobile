import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  @Input() item;
  @Output() click = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() {
  }

  itemClicked() {
    this.click.emit();
  }

  editItem() {
    this.edit.emit();
  }

  removeItem(){
    this.remove.emit();
  }

}
