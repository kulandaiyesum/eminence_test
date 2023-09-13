import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.localdomain + '/api/logins/save';

  constructor(private router: Router, private http: HttpClient) {}

  loginAuthenticate(data: any) {
    return this.http.post(`${this.loginURL}`, data, {
      headers: { 'content-Type': 'application/json' },
    });
  }
}
