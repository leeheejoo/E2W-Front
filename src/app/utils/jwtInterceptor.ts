import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let currentUser = JSON.parse(localStorage.getItem('e2w-currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    'Content-Type': 'application/json', 
                    Authorization: `${currentUser.token}`
                }
            });

           // console.log(currentUser.token);
        }
 
        return next.handle(request);
    }
}