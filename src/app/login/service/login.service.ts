import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.localdomain + 'logins/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  loginAuthenticate(data: any) {
    return this.http.post(`${this.loginURL}save`, data, {
      headers: this.headers,
    });
  }
}
