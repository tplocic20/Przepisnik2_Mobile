import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/map';
// import {Recipe} from "../models/Recipe";
// import {Note} from "../models/Note";
//
@Injectable()
export class ShareProvider {
//
//   constructor(private socialShare: SocialSharing) {
//
//   }
//
//   share(object: Recipe | Note) {
//     this.socialShare.share(this.isRecipe(object) ? this.convertRecipeToText(object) : this.convertNoteToText(object));
//   }
//
//   private convertNoteToText(note: Note){
//     let text: string[] = [];
//     text.push(`${note.Name}:`);
//     text.push(note.Content);
//     return text.join("\n");
//   }
//
//   private convertRecipeToText(recipe: Recipe): string {
//     let text: string[] = [];
//     text.push(`${recipe.Name}:`);
//     if (recipe.Temperature)
//       text.push(`Temperatura: ${recipe.Temperature}`);
//     if (recipe.Time)
//       text.push(`Czas: ${recipe.Time}`);
//     text = text.concat(this.engredientsToText(recipe.Engredients));
//     text.push("\n");
//     text.push(recipe.Recipe);
//
//     return text.join("\n");
//   }
//
//   private engredientsToText(groups: any[]): string[] {
//     let text: string[] = [];
//     for (let i = 0; i < groups.length; i++) {
//       text.push("\n");
//       text.push(`${(i + 1)}. ${groups[i].Name}`);
//       if (groups[i].Positions) {
//         for (let y = 0; y < groups[i].Positions.length; y++) {
//           const name = groups[i].Positions[y].Name;
//           const qty = groups[i].Positions[y].Qty ? groups[i].Positions[y].Qty : "";
//           const unit = groups[i].Positions[y].Unit ? groups[i].Positions[y].Unit : "";
//           const eng = `${name} ${qty} ${unit}`;
//           text.push(`- ${eng}`);
//         }
//       }
//     }
//     return text;
//   }
//
//   private isRecipe(object: any): object is Recipe {
//     return 'Recipe' in object;
//   }
//
}
