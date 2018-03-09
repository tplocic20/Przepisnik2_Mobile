import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class MessagesProvider {

  private loader: any;

  public loading = {
    /**
     * Show loading popover
     * @param {string} message Loading message
     */
    show: (message: string) => this.showLoading(message),
    /**
     * Hides loading popover
     */
    close: () => this.closeLoading()
  };

  public toast = {
    /**
     * Shows information toast
     * @param {string} message Loading message
     * @param {number} delay Optional - Toast delay
     * @param {string} position Optional - Toast position
     */
    info: (message, delay?, position?) => this.showInfoToast(message, delay, position),
    /**
     * Shows error toast in the middle of the screen with OK button
     * @param {string} message Error message
     */
    error: (message) => this.showErrorToast(message)
  };

  public alert = {
    /**
     * Show alert with input field. See below for options.
     * @param {string} [title] Alert title
     * @param {any} [callback] Callback function
     * @param {string} [placeholder] Optional - Input placeholder
     * @param {any} [initialInputValue] Optional - Input original value
     * @param {string} [successBtnText] Optional - Success button text
     */
    input: (title, callback, placeholder?, initialInputValue?, successBtnText?) => this.showInputAlert(title, callback, placeholder, initialInputValue, successBtnText),
    confirm: (title, callback, message?) => this.showConfirmAlert(title, callback, message),
    info: (tittle, message?) => this.showInfoAlert(tittle, message)
  };

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  private showLoading(message: string) {
    if (this.loader)
      this.loader.setContent(message);
    else {
      this.loader = this.loadingCtrl.create({content: message});
      this.loader.present();
    }
  }

  private closeLoading() {
    if (this.loader)
    this.loader.dismissAll();
    this.loader = null;
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
  private showInfoAlert(title: string, message: string = ''){
    const alert = this.alertCtrl.create({
      title: title,
      message: message
    });
    alert.present();
  }

}
