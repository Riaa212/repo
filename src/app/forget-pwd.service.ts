import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class ForgetPwdService {

  baseurl="/user"

  constructor(public http:HttpClient) {

   }

   generateOtp(data:any):Observable<any>
   {
    // console.log("data==>"+data)
    return this.http.get<any>(this.baseurl+"/testOtp/"+data,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
    // .pipe(tap((response: any) => console.log('API Response:', response)),
   }

   verifyOtp(user:User):Observable<User>
   {
    console.log("verify otp....")
    return this.http.post<User>(this.baseurl+"/resetpassword",user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
      // {
      //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      // },
    );
   }


}
// const headers = new HttpHeaders().set('Content-Type', 'application/json');
// this.http.post('http://localhost:4200/user/userOtp', body, { headers })
//   .subscribe(response => {
//     console.log(response);
//   });
