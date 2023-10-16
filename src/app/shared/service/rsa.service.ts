import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class RsaService {
  encryptMode: boolean;
  textToConvert: string;
  password = 'Shine@321';
  conversionOutput: string;
  constructor() {}
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey);
    return encrypted.toString();
  }

  encrypt = (textToConvert) => {
    return (this.conversionOutput = CryptoJS.AES.encrypt(
      textToConvert.trim(),
      this.password.trim()
    ).toString());
  };

  decrypt = (textToConvert) => {
    return (this.conversionOutput = CryptoJS.AES.decrypt(
      textToConvert.trim(),
      this.password.trim()
    ).toString(CryptoJS.enc.Utf8));
  };
}
