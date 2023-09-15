import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuDisply!: boolean;
  currentRoute: string = '';
  constructor(private router: Router, public dialog: MatDialog) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url === '/home' ||
          event.url === '/enterprise' ||
          event.url === '/about-us'
        ) {
          this.currentRoute = event.url;
        }
        if (event.url === '/' || event.url === '') {
          this.currentRoute = '/home';
        }
      }
    });
  }
  ngOnInit(): void {}

  openLoginPopUp() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: 'auto',
      data: 'Message from header',
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
