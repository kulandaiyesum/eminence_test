import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userUrl = environment.localdomain + 'user/';

  constructor(private http: HttpClient) {}

  registerUser(user) {
    console.log(user)
    return this.http.post(this.userUrl + 'save', user);
  }
}
