import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userUrl = environment.localdomain + 'user/register';

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post(this.userUrl, user);
  }
}
