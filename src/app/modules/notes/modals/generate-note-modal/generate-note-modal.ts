import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Recipe} from "../../../../../models/Recipe";
import {FireProvider} from "../../../../../providers/fire";
import {Collapse} from "../../../../../theme/animations/animations";
import {MessagesProvider} from "../../../../../providers/messages";

@Component({
  selector: 'page-generate-note-modal',
  animations: [Collapse(300)],
  templateUrl: 'generate-note-modal.html',
})
export class GenerateNoteModal {

  recipe: Recipe = {
    Temperature: null,
    Time: null
  };
  attachTemperature: boolean = false;
  attachTime: boolean = false;
  attachTEngredients: boolean = false;
  categoires: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private srv: FireProvider, private msg: MessagesProvider) {
  }

  ionViewDidLoad() {
    const recId = this.navParams.get('recId');
    this.srv.getRecipe(recId).subscribe(res => this.prepareData(res));
  }

  prepareData(data: Recipe) {
    this.recipe = data;
    for (let i = 0; i < data.Engredients.length; i++) {
      this.categoires.push({
        id: i,
        Name: data.Engredients[i].Name,
        isChecked: true
      });
    }
  }

  engredientsChanged() {
    if (this.attachTEngredients) {
      for (let i = 0; i < this.categoires.length; i++) {
        this.categoires[i].isChecked = true;
      }
    }
  }

  saveChanges() {
    this.srv.addNote({
      Name: this.recipe.Name,
      Content: this.convertRecipeToText()
    }).then(() => this.viewCtrl.dismiss());
  }

  discardChanges() {
    this.msg.alert.confirm('', () => this.viewCtrl.dismiss(), 'Czy na pewno chcesz anulować zmiany');
  }

  private convertRecipeToText(): string {
    let text: string[] = [];
    if (this.attachTemperature)
      text.push(`Temperatura: ${this.recipe.Temperature}`);
    if (this.attachTime)
      text.push(`Czas: ${this.recipe.Time}`);
    text = text.concat(this.engredientsToText(this.recipe.Engredients));
    text.push(this.recipe.Recipe);

    return text.join("\n");
  }

  private engredientsToText(groups: any[]): string[] {
    const allowedGroups = this.categoires.filter(cat => cat.isChecked).map(item => item.id);
    let text: string[] = [];
    for (let i = 0; i < allowedGroups.length; i++) {
      const group = groups[allowedGroups[i]];
      if (group != null) {
        text.push(`${(i + 1)}. ${group.Name}`);
        if (group.Positions) {
          for (let y = 0; y < group.Positions.length; y++) {

            const name = group.Positions[y].Name;
            const qty = group.Positions[y].Qty ? group.Positions[y].Qty : "";
            const unit = group.Positions[y].Unit ? group.Positions[y].Unit : "";
            const eng = `${name} ${qty} ${unit}`;
            text.push(`- ${eng}`);
          }
        }
        text.push("\n");
      }
    }
    return text;
  }

}
