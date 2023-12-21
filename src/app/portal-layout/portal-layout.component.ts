import { RsaService } from './../shared/service/rsa.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ProfileComponent } from './components/profile/profile.component'
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
})
export class PortalLayoutComponent implements OnInit, OnDestroy {
  secretKey: string = environment.secretKey;
  public role: string = '';
  // questionNumbers = [1, 2, 3, 4, 5, 6, 7];
  pathMatch: boolean = false;
  private pathSubcriber: Subscription;
  isExamAttending;
  @ViewChild('drawer') drawer: MatSidenav;
  constructor(
    private router: Router,
    private rsaService: RsaService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'custom-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/qgen.svg')
    );
  }
  firstName: string = '';

  ngOnDestroy(): void {
    this.pathSubcriber.unsubscribe();
  }
  ngOnInit(): void {
    const encrptedRole = localStorage.getItem('2');
    this.role = this.rsaService.decryptText(encrptedRole, this.secretKey);

    this.isExamAttending = localStorage.getItem('11');

    const storedFirstName: string = localStorage.getItem('3');
    this.firstName = this.rsaService.decryptText(
      storedFirstName,
      this.secretKey
    );
    this.pathSubcriber = this.router.events.subscribe((event: Scroll) => {
      if (event?.routerEvent?.url.match(/\/eminence\/vetter\/questions\//)) {
        this.pathMatch = true;
      } else {
        this.pathMatch = false;
      }
      if (
        event?.routerEvent?.url.match(
          /\/eminence\/student\/(exam|exam-timed)\/?/
        )
      ) {
        this.drawer.close();
      }
    });


  }
  ngDoCheck() {
    // Custom change detection logic
    // console.log('ngDoCheck called');
    this.isExamAttending = localStorage.getItem('11');
    const storedFirstName: string = localStorage.getItem('3');
    this.firstName = this.rsaService.decryptText(
      storedFirstName,
      this.secretKey
    );
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  showToggleButton: boolean = false;
  toggleMenu() {
    this.showToggleButton = true;
  }
  hideMenu() {
    this.showToggleButton = false;
  }

  logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isFaculty() {
    return this.role === 'FACULTY';
  }
  isVetter() {
    return this.role === 'VETTER';
  }
  isStudent() {
    return this.role === 'STUDENT' && this.isExamAttending === 'true';
  }

  helpPopUp() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '600px', // Set the desired width
      height: '300px', // Set the desired height
      data: this.role,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: 'auto', // Set the desired width
      height: 'auto', // Set the desired height
      data: this.role,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
