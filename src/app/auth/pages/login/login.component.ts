import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InitializeService } from 'src/app/services/initialize.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(private fb: FormBuilder,
              private initService: InitializeService,
              private authService: AuthService){

  }

  async login(){
    const email = this.myForm.controls.username.value+"@siscap.com";
    const password = this.myForm.controls.password.value || "";



    this.authService.SignIn(email, password);

  }

  get loading(){

    return this.authService._loading;
  }

}
