import { Component, inject } from '@angular/core';
import { LoginStorageService } from '../../login-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  storage=inject(LoginStorageService)
  route=inject(Router)
  
  logout(){
    this.storage.removeData("token")
    // console.log( this.storage.getLoginData('logindata'))
    this.route.navigate(['/login'])
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
