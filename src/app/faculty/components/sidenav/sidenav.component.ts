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
    this.opened = true;
  }


  private checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const mobileScreenWidthThreshold = 576;
    const tabletScreenWidthThreshold = 768;
    const laptopScreenWidthThreshold = 1024;

    if (screenWidth < mobileScreenWidthThreshold) {
      this.mobileScreenMethod();
    } else if (screenWidth >= mobileScreenWidthThreshold && screenWidth < tabletScreenWidthThreshold) {
      this.tabletOrLaptopScreenMethod();
    } else if (screenWidth >= tabletScreenWidthThreshold && screenWidth < laptopScreenWidthThreshold) {
      this.tabletOrLaptopScreenMethod();
    }
  }

}
