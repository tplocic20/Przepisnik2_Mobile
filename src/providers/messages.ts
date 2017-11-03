import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  private loader: any;

  public loading = {
    /**
     * Show loading popover
     * @param {string} m Loading message
     */
    show: (m) => this.showLoading(m),
    /**
     * Hides loading popover
     */
    close: () => this.closeLoading()
  };

  public toast = {
    /**
     * Shows information toast
     * @param {string} m Loading message
     * @param {number} d Optional - Toast delay
     * @param {string} p Optional - Toast position
     */
    info: (m, d?, p?) => this.showInfoToast(m, d, p),
    /**
     * Shows error toast in the middle of the screen with OK button
     * @param {string} m Error message
     */
    error: (m) => this.showErrorToast(m)
  };

  public alert = {
    /**
     * Show alert with input field. See below for options.
     * @param {string} [t] Alert title
     * @param {any} [c] Callback function
     * @param {string} [p] Optional - Input placeholder
     * @param {any} [i] Optional - Input original value
     * @param {string} [s] Optional - Success button text
     */
    input: (t, c, p?, i?, s?) => this.showInputAlert(t, c, p, i, s),
    confirm: (t, c, m?) => this.showConfirmAlert(t, c, m)
  };

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  private showLoading(message: string) {
    this.loader = this.loadingCtrl.create({content: message});
    this.loader.present();
  }

  private closeLoading() {
    this.loader.dismiss();
  }

  private showInfoToast(message: string, duration: number = 3000, position: string = 'bottom') {
    this.toastCtrl.create({
      message: message, duration: duration, position: position
    }).present();
  }

  private showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message, position: 'center', showCloseButton: true, closeButtonText: 'Zamknij', cssClass: 'errorToast'
    }).present();
  }

  private showInputAlert(title: string, successCallback: any, placeholder: string = '', inputValue: any = null, successBtnText: string = 'Dodaj') {
    const alert = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'text',
          placeholder: placeholder,
          value: inputValue
        }
      ],
      buttons: [
        {text: "Anuluj", role: "cancel"},
        {
          text: successBtnText, handler: data => {
          if (data.text.length > 0)
            successCallback(data.text)
        }
        }
      ]
    });
    alert.present();
  }

  private showConfirmAlert(title: string, successCallback: any, message: string = '') {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Nie',
          role: 'cancel'
        },
        {
          text: 'Tak',
          handler: () => {
            successCallback()
          }
        }
      ]
    });
    alert.present();
  }

}
