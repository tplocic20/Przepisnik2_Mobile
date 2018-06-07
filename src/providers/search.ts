import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchProvider {

  public value: string;
  @Output() recipeSelected: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.value = "";
  }

  selectRecipe(data: any){
    this.recipeSelected.emit(data);
  }

}
