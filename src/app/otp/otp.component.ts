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

  forgetpwdservice=inject(ForgetPwdService)

  forgetpwdData:FormGroup
  // email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  users:User=new User();
  constructor(fb:FormBuilder)
  {
    this.forgetpwdData=fb.group({
      email:[this.users.email,Validators.required],
      // password:['',Validators.required]
    })
  }

  sendOtp() {
    // if (!this.email) return;
    this.forgetpwdservice.generateOtp(this.forgetpwdData.value.email).subscribe(rs=>{
      
      console.log("send otp....",this.otp=rs);
    })

    // Yahan backend ko call karke OTP bhejna hota hai
    
    // console.log('Sending OTP to email:',this.forgetpwdData.value.email);
    
    // Simulate OTP sent
    this.otpSent = true;
  }

  verifyOtp() {
    // if (!this.otp) return;

    // Yahan OTP verify karna hota hai
    console.log('Verifying OTP:', this.otp);
  }
}
