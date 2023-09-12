import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuDisply: boolean = false;
  constructor(public dialog: MatDialog) {}
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
