import { CanActivateFn, Router } from '@angular/router';
import { LoginStorageService } from './login-storage.service';
import { inject } from '@angular/core';


export const authGraudGuard: CanActivateFn = (route, state) => {
let storage=inject(LoginStorageService)
const r=inject(Router)

let log=storage.getLoginData('token')

console.log("=====>"+log)

if(log==null)
{
  r.navigate(['/login'])  
  return false;
}
  return true;
};
