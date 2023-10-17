import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpInterceptorService {
  public token;
  public basicAuth;
  constructor(private router: Router) {
    this.token = 'Bearer ' + localStorage.getItem('1');
    this.basicAuth = `Basic ` + btoa('EminenceAI:ZW1pbmVuY2VBSUAxMjM=');
  }

  handelError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  private _getToken(): any {
    return localStorage.getItem('1');
  }

  private _setHeaders(authRequired = true): HttpHeaders {
    this.token = 'Bearer ' + localStorage.getItem('1');
    if (authRequired) {
      if (this.token) {
        const headersConfig = {
          token: this.token,
          Authorization: this.basicAuth,
        };
        return new HttpHeaders(headersConfig);
      } else {
        const token = this._getToken();
        this.token = 'Bearer ' + token;
        if (token != null) {
          const headersConfigs = {
            token: this.token,
            Authorization: this.basicAuth,
          };
          return new HttpHeaders(headersConfigs);
        }
        const headersConfig = {
          Authorization: this.basicAuth,
        };
        return new HttpHeaders(headersConfig);
      }
    } else {
      const headersConfig = {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth,
      };
      return new HttpHeaders(headersConfig);
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    req = req.clone({
      headers: this._setHeaders(),
    });
    return next.handle(req).pipe(
      catchError((err: any, caught: Observable<HttpEvent<any>>) => {
        if (err.status === 400) {
          localStorage.clear();
          return this.router.navigateByUrl('/home');
        } else {
          return throwError(err);
        }
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) {
          //   console.log('this should print your error!', err.error);
          // }
        }
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
