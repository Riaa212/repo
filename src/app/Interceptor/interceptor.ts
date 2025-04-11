import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserloginService } from "../services/userlogin.service";
import { LoginStorageService } from "../login-storage.service";

export class loggingInterceptor implements HttpInterceptor{
        // console.log(req.url);
        // return next(req);
        constructor()
        {
            console.log('in interceptor....')
        }

        loginService=inject(LoginStorageService)
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            let currentUser = this.loginService.getLoginData('token');
            // let currentUserEmail = this.loginService.getLoginData('uname'); 
            // console.log("current user email==>"+currentUserEmail)
             // Method to get the JWT token
             console.log("in interceptor...");
             
            if (currentUser) {
              request = request.clone({
                setHeaders: {
                  'Authorization': `Bearer ${currentUser}`,
                  'Content-Type': 'application/json', // You can add other headers if necessary
                }
              });
            }
            return next.handle(request);
          }
}

