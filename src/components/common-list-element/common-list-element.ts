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

  @Input() item = {Name: "Wszystkie"};
  @Input() blockSlide = false;
  @Output() onClick = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor() {
  }

  itemClicked() {
    this.onClick.emit();
  }

  editItem() {
    this.onEdit.emit();
  }

  removeItem(){
    this.onRemove.emit();
  }

}
