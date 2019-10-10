import { Component } from '@angular/core';
import {  } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../providers/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  failedAttempt: boolean = false;
  rememberMe: boolean = false;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: ['tplocic20@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['xD', Validators.required]
    })
  }

  submit(){
    this.submitAttempt = true;
    this.failedAttempt = false;
    this.auth.signIn('tplocic20@gmail.com', 'Shogun123').then(() => {
      this.router.navigate(['tabs']);
    });
  }

}
