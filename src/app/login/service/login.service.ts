import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.localdomain + 'logins/';
  forgotPasswordURL = environment.localdomain + 'logins/updateForgotPassword';
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  loginAuthenticate(data: any) {
    return this.http.post(`${this.loginURL}save`, data, {
      headers: this.headers,
    });
  }
  resetPassword(data) {
    return this.http.post(`${this.loginURL}forgotPassword`, data);
  }

  updatePassword(data){
    return this.http.put(this.forgotPasswordURL, data);
  }

  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey);
    return encrypted.toString();
  }
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
