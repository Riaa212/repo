import { inject, Injectable } from '@angular/core';
import { LoginResponse } from './model/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginStorageService {

  // loginres=inject(LoginResponse)
  constructor() { 
    // console.log(this.loginres)
  }

  
  setLoginData(key:string,value:string):void
  {
    sessionStorage.setItem(key,value)
  }

  getLoginData(key:string):string|null
  {
    return sessionStorage.getItem(key)
  }

  removeData(key:string):void
  {
    sessionStorage.removeItem(key)
  }

  clearData():void
  {
    sessionStorage.clear();
  }
}
