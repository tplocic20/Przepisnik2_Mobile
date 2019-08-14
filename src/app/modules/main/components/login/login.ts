import { Component } from '@angular/core';
import {  } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  failedAttempt: boolean = false;
  rememberMe: boolean = false;

  constructor(  private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      login: ['tplocic20@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['xD', Validators.required]
    })
  }

  submit(){
    this.submitAttempt = true;
    this.failedAttempt = false;
    const email = this.loginForm.controls.login.value;
    const pass = this.loginForm.controls.password.value;
    if (!this.loginForm.invalid){

    }
  }

}
