import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Recipe} from "../models/Recipe";

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {

  constructor() {

  }

  convertRecipeToText(recipe: Recipe) {
    let text: string = "";
    text += this.append(recipe.Name, 2);
    if (recipe.Temperature)
      text += this.append("Temperatura: " + recipe.Temperature, 1);
    if (recipe.Time)
      text += this.append("Czas: " + recipe.Time, 1);
    text += this.append(this.engredientsToText(recipe.Engredients), 2);
    text += this.append(recipe.Recipe);

    return text;
  }

  private append(text: string, newLines: number = 0) {
    let appendTo = text;
    for (let i = 0; i < newLines; i++) {
      appendTo += "/n";
    }
    return appendTo;
  }

  private engredientsToText(groups: any[]) {
    let text: string = "";
    for (let i = 0; i < groups.length; i++) {
      text += this.append("/n" + (i + 1) + ". " + groups[i].Name, 1);
      for (let y = 0; y < groups[i].Positions.length; y++) {

        const eng = groups[i].Positions[y].Name + " " + groups[i].Positions[y].Qty + " " + groups[i].Positions[y].Unit;
        text += this.append("- " + eng, 1);
      }
    }
    return text;
  }

}
