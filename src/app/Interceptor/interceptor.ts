import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserloginService } from "../services/userlogin.service";
import { LoginStorageService } from "../login-storage.service";
import * as CryptoJS from  'crypto-js';
export class loggingInterceptor implements HttpInterceptor{
        // console.log(req.url);
        // return next(req);
        constructor()
        {
            console.log('in interceptor....')
        }

        loginService=inject(LoginStorageService)
        
        //secret key
        private key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Replace with secure key
        private iv = CryptoJS.enc.Utf8.parse('6543210987654321'); // Replace with secure IV

        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

          //encryption response
          const body = JSON.stringify(request.body || {});
          const encrypted = CryptoJS.AES.encrypt(body, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });



            let currentUser = this.loginService.getLoginData('token');
            // let currentUserEmail = this.loginService.getLoginData('uname'); 
            // console.log("current user email==>"+currentUserEmail)
            
             // Method to get the JWT token
             console.log("in interceptor...");
             console.log("key================"+encrypted)
            //  console.log("================="+this.iv.toString())
            if (currentUser) {
              request = request.clone({
                
                //encryption 
                body: {
                  data: encrypted.toString() // Encrypted string
                },

                setHeaders: {
                  'Authorization': `Bearer ${currentUser}`,
                  'Content-Type': 'application/json', // You can add other headers if necessary
                }
              });
            }
            return next.handle(request);
          }
}

