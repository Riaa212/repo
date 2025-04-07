import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-pwd',
  standalone: false,
  templateUrl: './forget-pwd.component.html',
  styleUrl: './forget-pwd.component.css'
})
export class ForgetPwdComponent
 {
  email:any

  constructor(fb:FormBuilder)
  {
    this.email=fb.group({
      email:['',Validators.required]
    })
  }
  

  submitForm()
  {
    alert('please check your email')
    console.log("email===>"+this.email.value)
  }

  get msg(){
    return this.email.controls;
  }
  
}
