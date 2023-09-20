import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionPopupComponent } from '../subscription-popup/subscription-popup.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addData() {
    const dialogRef = this.dialog.open(SubscriptionPopupComponent, {
      width: '500px',
      height: 'auto',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
