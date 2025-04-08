import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  baseurl="http://localhost:8087/user"

  constructor(public http:HttpClient) {

   }

   login(loginData:any):Observable<any>
   {
    return this.http.post<any>(this.baseurl+"/loginReq",loginData)
    .pipe(tap((response: any) => console.log('API Response:', response)))
   }
}
