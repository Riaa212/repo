import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseurl="http://localhost:8087/user"
  constructor(public http:HttpClient) {

   }

   RegisterUser(user:any):Observable<User>
   {
    return this.http.post<User>(this.baseurl+"/register",user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ); 
   }
}
