import {EventEmitter, Injectable, Output} from '@angular/core';

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
