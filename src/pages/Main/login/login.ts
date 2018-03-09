import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FireProvider} from "../../../providers/fire";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  failedAttempt: boolean = false;
  rememberMe: boolean = false;

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder, private srv: FireProvider) {
    this.loginForm = this.formBuilder.group({
      login: ['tplocic20@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['Shogun123', Validators.required]
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
