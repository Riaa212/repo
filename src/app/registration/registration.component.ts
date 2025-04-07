import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserServiceService } from './../services/user-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit
{
  // constructor(fb:FormBuilder)
  // {
  //   this.email=fb.group({
  //     email:['',Validators.required]
  //   })
  // }
  
  regForm:FormGroup
  users:User=new User();
  constructor(fb:FormBuilder,public userService:UserServiceService ,public http:HttpClient)
  {
    this.regForm=fb.group({
      userName:[this.users.userName,Validators.required],
      email:[this.users.email,Validators.required],
      password:[this.users.password,Validators.required],
      // cPassword:[this.users.password,Validators.required]
    })
  }
  ngOnInit() {
    // throw new Error('Method not implemented.');
    console.log(this.regForm.value)
  }

  //register user
  submitForm(){
    // const formData = new FormData();
    // formData.append('userName', this.regForm.get('userName')?.value);
    // formData.append('email', this.regForm.get('email')?.value);
    // formData.append('password', this.regForm.get('password')?.value);
    // console.log("formdata==>"+formData)
    // this.http.post("http://localhost:8087/user/register",this.regForm.value,
    //   {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //   }
    // ).subscribe((res)=>res)
    this.userService.RegisterUser(this.regForm.value).subscribe()
  }

  get msg()
  {
  return this.regForm.controls;
  }
}
