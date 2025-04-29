import { Component, inject } from '@angular/core';
import { ForgetPwdService } from '../forget-pwd.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  flag:any=false
  error:string=''
  emailnotExist:boolean=true

  forgetpwdservice=inject(ForgetPwdService)
  
  val:User[]=[]

  forgetpwdData:FormGroup

  // email: string = '';
  
  otp: string = '';

  otpSent: boolean = false;
  users:User=new User();
  constructor(fb:FormBuilder)
  {
    this.forgetpwdData=fb.group({
      email:[this.users.email,Validators.required],
      password:[this.users.password,Validators.required]
    })
  }

  sendOtp() {
    // if (!this.email) return;
    console.log("send otp email===>"+this.forgetpwdData.value.email)
    this.forgetpwdservice.generateOtp(this.forgetpwdData.value.email).subscribe(
      (rs)=>{
      
      // console.log("rs==>"+this.otp)
      if(rs!=null)
      {
        this.users.otp=rs;
        this.otpSent=true
        console.log("send otp....",this.otp=rs);
      }
      else 
      {
        this.emailnotExist=false
        this.otpSent=false
        // alert('email does not exist...')
        this.error="Invalid email ...."
      }
    },
  (err)=>{
    console.log(err)
  })
  }

  verifyOtp() {
    this.val=this.forgetpwdData.value
    // console.log("form data===>"+this.forgetpwdData.value)
    this.forgetpwdservice.verifyOtp(this.forgetpwdData.value).subscribe(rs=>console.log(rs))
    
    // console.log('Verifying OTP:', this.otp);
  }

}
