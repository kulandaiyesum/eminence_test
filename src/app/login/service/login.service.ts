import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginURL = environment.localdomain + 'users';
  forgotPasswordURL = environment.localdomain + 'logins/updateForgotPassword';

  constructor(private http: HttpClient) {}

  loginAuthenticate(data) {
    return this.http.post(this.loginURL + '/login', data);
  }
  resetPassword(data) {
    return this.http.post(this.loginURL + '/forgotPassword', data);
  }

  updatePassword(data) {
    return this.http.put(this.loginURL + '/' + data._id, data);
  }

  verifyText(data) {
    return this.http.put(this.loginURL + '/', data);
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
