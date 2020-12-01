import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    // no headers to add for the following requests
    if (httpRequest.url.includes(`${this.authenticationService.host}/users/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.host}/users/register`)) {
      return httpHandler.handle(httpRequest);
    }
    // we send header params in other requests
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const clonedRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return httpHandler.handle(clonedRequest);
  }
}
