import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FireProvider} from "../../providers/fire";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  failedAttempt: boolean = false;
  rememberMe: boolean = false;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private srv: FireProvider) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  submit(){
    this.submitAttempt = true;
    this.failedAttempt = false;
    const email = this.loginForm.controls.login.value;
    const pass = this.loginForm.controls.password.value;
    if (!this.loginForm.invalid){
      this.srv.signIn(email, pass).then(() => {
        if (this.rememberMe){
          this.srv.rememberMe(email, pass);
        }
        this.viewCtrl.dismiss(true);
      }, (err) => {
        this.failedAttempt = true;
      })
    }
  }

}
