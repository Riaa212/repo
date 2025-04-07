import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
email: string = '';
  otp: string = '';
  otpSent: boolean = false;

  sendOtp() {
    if (!this.email) return;

    // Yahan backend ko call karke OTP bhejna hota hai
    console.log('Sending OTP to email:', this.email);
    
    // Simulate OTP sent
    this.otpSent = true;
  }

  verifyOtp() {
    if (!this.otp) return;

    // Yahan OTP verify karna hota hai
    console.log('Verifying OTP:', this.otp);
  }
}
