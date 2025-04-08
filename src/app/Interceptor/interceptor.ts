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
            let currentUser = this.loginService.getLoginData('token');  // Method to get the JWT token
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

