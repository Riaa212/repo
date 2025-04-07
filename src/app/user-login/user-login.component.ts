import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent 
 {

  loginForm:any

    constructor(fb:FormBuilder)
    {
      this.loginForm=fb.group({
        email:['',Validators.required],
        password:['',Validators.required]
      })
    }


  submitForm()
  {
    console.log("login form===>"+this.loginForm.controls)
  }

  get msg(){
    return this.loginForm.controls;
  }
}
