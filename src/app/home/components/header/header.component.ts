import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/components/login/login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private breakpointObserverSubscription: Subscription;
  isMenuDisply!: boolean;
  currentRoute: string = '';
  isScreenMath: boolean = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
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
  ngOnDestroy(): void {
    if (this.breakpointObserverSubscription) {
      this.breakpointObserverSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe('(max-width: 820px)')
      .subscribe((result) => {
        if (result.matches) {
          this.isScreenMath = true;
        } else {
          this.isScreenMath = false;
        }
      });
  }

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
