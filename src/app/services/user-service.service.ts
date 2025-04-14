import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseurl="/user"
  constructor(public http:HttpClient) {

   }

   //register user
   RegisterUser(user:any):Observable<User>
   {
    return this.http.post<User>(this.baseurl+"/register",user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ); 
   }


   //get user id
   getUserId(id:any):Observable<User>
   {
    return this.http.get<User>(this.baseurl+"/getById/"+id)
   }
}
