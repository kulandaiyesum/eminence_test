import { RsaService } from './../shared/service/rsa.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
})
export class PortalLayoutComponent implements OnInit {
  secretKey: string = environment.secretKey;
  public role: string = '';
  constructor(private router: Router, private rsaService: RsaService) {}
  firstName: string = '';
  ngOnInit(): void {
    const encrptedRole = localStorage.getItem('2');
    this.role = this.rsaService.decryptText(encrptedRole, this.secretKey);
    console.log(this.role);
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
}
