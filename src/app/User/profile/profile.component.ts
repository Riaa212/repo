import { Component, inject } from '@angular/core';
import { LoginStorageService } from '../../login-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from  'crypto-js';
import { constant } from '../../constant';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  useremail:any
  userData:any
  storage=inject(LoginStorageService)
  route=inject(Router)
  userFormData:any
  baseUrl="/user"

  dycryptedName:any

  dycrptData(data:any)
  {
    return CryptoJS.AES.decrypt(data,constant.EN_KEY).toString(CryptoJS.enc.Utf8);
  }

  constructor(public http:HttpClient,fb:FormBuilder)
  {
     const uname=this.storage.getLoginData("uname")
     this.dycryptedName=this.dycrptData(uname);
    this.userFormData=fb.group({
      userName:['',Validators.required],
      // password:['',Validators.required],
      email:['',Validators.required],
      bio:['',Validators.required]
    })

    //get user details for user profile
    this.useremail=this.storage.getLoginData("uname")
    this.storage.getLoginData("token")
    http.get(this.baseUrl+"/getUserByEmail/"+this.useremail).subscribe((rs)=>this.userData=rs)
    console.log("userData===>"+this.userData)
  }

  getUserDetails()
  {
    this.storage.getLoginData("token")
    // console.log(this.userData+"user data===>")
  }

  logout(){
    this.storage.removeData("token")
    this.storage.removeData("uname")
    // console.log( this.storage.getLoginData('logindata'))
    this.route.navigate(['/login'])
  }


  updateProfile()
  {
    // console.log("update user Id==>"+this.userData.id)
    this.http.put(this.baseUrl+"/update/"+this.userData.id,this.userFormData.value).subscribe((rs)=>{
      this.userData=rs
      alert("profile updated successfully")
    })
    // this.storage.getLoginData("token")
  }
  
  // constructor()
  // {
  //  let log=this.storage.getLoginData('logdata')

  //  if(log==null)
  //  {
  //   console.log(log)
  //   this.route.navigate(['/login'])
  //  }
  //  else
  //  {
  //   this.route.navigate(['/profile'])
  //  }
  //  console.log(this.storage.getLoginData('logdata'))
  // }

  
}
