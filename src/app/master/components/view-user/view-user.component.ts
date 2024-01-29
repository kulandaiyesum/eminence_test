import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../model/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log(data)
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
