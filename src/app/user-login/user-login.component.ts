import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStorageService } from '../login-storage.service';
import { UserloginService } from '../services/userlogin.service';
import { LoginResponse } from '../model/login-response';
import { User } from '../model/user';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent 
 {

  //login input
  loginForm:any
  
  loginres:any

    users:User=new User();
  //login data service
  logDataService=inject(LoginStorageService)
  //routing
  r=inject(Router)
  userLoginService=inject(UserloginService)

    constructor(fb:FormBuilder)
    {
      this.loginForm=fb.group({
        email:['',Validators.required],
        password:['',Validators.required]
      })
    }

  //login form 
  submitLoginForm()
  {
    let loginData=this.loginForm?.value;
    this.userLoginService.login(loginData).subscribe((rs)=>{
      sessionStorage.setItem('token', rs.tocken) 
      if (rs && rs.tocken) {
         console.log('token:', rs.tocken);
         sessionStorage.setItem('token', rs.tocken);  // Store the token in localStorage
         this.r.navigate(['/profile']);  // Navigate to the admin page
       } else {
         console.error('Token not found in the response');
        //  this.errmsg = 'Failed to retrieve token.';
       }
    })
    this.r.navigate(['profile'])

  }
  

  get msg(){
    return this.loginForm.controls;
  }
}
