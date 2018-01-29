import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Recipe} from "../models/Recipe";
import {SocialSharing} from "@ionic-native/social-sharing";

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {

  constructor(private socialShare: SocialSharing) {

  }

  share(object: Recipe) {
    this.socialShare.share(this.convertRecipeToText(object));
  }

  convertRecipeToText(recipe: Recipe): string {
    let text: string[] = [];
    text.push(recipe.Name + ":");
    if (recipe.Temperature)
      text.push("Temperatura: " + recipe.Temperature);
    if (recipe.Time)
      text.push("Czas: " + recipe.Time);
    text = text.concat(this.engredientsToText(recipe.Engredients));
    text.push("\n");
    text.push(recipe.Recipe);

    return text.join("\n");
  }

  private engredientsToText(groups: any[]): string[] {
    let text: string[] = [];
    for (let i = 0; i < groups.length; i++) {
      text.push("\n");
      text.push((i + 1) + ". " + groups[i].Name);
      for (let y = 0; y < groups[i].Positions.length; y++) {

        const eng = groups[i].Positions[y].Name + " " + groups[i].Positions[y].Qty + " " + groups[i].Positions[y].Unit;
        text.push("- " + eng);
      }
    }
    return text;
  }

}
