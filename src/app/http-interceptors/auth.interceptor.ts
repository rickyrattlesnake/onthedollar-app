import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    console.log('[-] AuthInterceptor :: starts');

    const sessionToken = this.auth.getSessionToken();
    if (sessionToken != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${sessionToken}`),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
