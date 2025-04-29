import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStorageService } from '../login-storage.service';
import { UserloginService } from '../services/userlogin.service';
import { LoginResponse } from '../model/login-response';
import { User } from '../model/user';
import { constant } from '../constant';
import * as CryptoJS from  'crypto-js';
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

    //encrypt data
    // encryptData(data:any)
    // {
    //   return CryptoJS.AES.encrypt(data,constant.EN_KEY).toString();
    // }

  //login form 
  submitLoginForm()
  {
    let loginData=this.loginForm?.value;

    const payload={
      'email':this.loginForm.value.email,
      'password':this.loginForm.value.password
    }
  // const e=this.encryptData(payload.email)
    const e=payload.email
  console.log("encrypted ============="+e);
    this.userLoginService.login(this.loginForm.value).subscribe((rs)=>{
  

      if (rs && rs.tocken) {
        console.log("pay load..........."+payload)
        sessionStorage.setItem('token', rs.tocken) 
        console.log(rs.userName)
         console.log('token:', rs.tocken);
         sessionStorage.setItem('token', rs.tocken); 
                  sessionStorage.setItem('uname',(rs.userName)) 
        //  sessionStorage.setItem('uname',this.encryptData(rs.userName)) 
         // Store the token in localStorage
         this.r.navigate(['/profile']);  // Navigate to the admin page
       } else {
         console.error('Token not found in the response');
         alert('bad credenctials')
        //  location.reload()
        //  this.r.navigate(['/login'])
        //  this.errmsg = 'Failed to retrieve token.';
       }
    })
    this.r.navigate(['profile'])

  }
  

  get msg(){
    return this.loginForm.controls;
  }
}
