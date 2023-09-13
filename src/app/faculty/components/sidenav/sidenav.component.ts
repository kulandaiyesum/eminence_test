import { Component,HostListener, Renderer2 } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  opened = true;
  selectedIndex: number | null = 0;
  public component = 'qgen';
  decryptFirstName!:string;
  secretKey=environment.secretKey
  constructor(
    private renderer: Renderer2
  ) {
    this.checkScreenWidth();
  }
  ngOnInit(): void {
    const storedFirstName = localStorage.getItem('firstname') || '';
    this.decryptFirstName = this.decryptText(storedFirstName, this.secretKey);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }
  changeBackgroundColor(index: number): void {
    this.selectedIndex = index;
  }
  qgen() {
    this.opened = false;
    this.component = 'qgen';
  }
  editor() {
    this.opened = false;
    this.component = 'editor';
  }
  askeminence() {
    this.opened = false;
    this.component = 'askeminence';
  }

  history() {
    this.opened = false;
    this.component = 'history';
  }
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  private mobileScreenMethod() {
    this.opened = false;
  }

  private tabletOrLaptopScreenMethod() {
    this.opened = true; // Adjust this behavior as needed

  }


  private checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const mobileScreenWidthThreshold = 576; // Adjust this threshold for mobile screens
    const tabletScreenWidthThreshold = 768; // Adjust this threshold for tablet screens
    const laptopScreenWidthThreshold = 1024; // Adjust this threshold for laptop screens

    if (screenWidth < mobileScreenWidthThreshold) {
      // Mobile screen detected, trigger your mobile screen method
      this.mobileScreenMethod();
    } else if (screenWidth >= mobileScreenWidthThreshold && screenWidth < tabletScreenWidthThreshold) {
      // Tablet screen detected, trigger your tablet screen method
      this.tabletOrLaptopScreenMethod();
    } else if (screenWidth >= tabletScreenWidthThreshold && screenWidth < laptopScreenWidthThreshold) {
      // Laptop screen detected, trigger your laptop screen method
      this.tabletOrLaptopScreenMethod();
    }
  }

}
