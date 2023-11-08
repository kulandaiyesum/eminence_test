import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SerumValuesComponent } from '../serum-values/serum-values.component';

@Component({
  selector: 'app-lab-values',
  templateUrl: './lab-values.component.html',
  styleUrls: ['./lab-values.component.scss']
})
export class LabValuesComponent {
  selectedButton: number = 0;
  tabGroupIsOpen: boolean;
  dialogRef: any;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialogRef = this.dialog.open(SerumValuesComponent, {
      width: '80%',
    });
  }

  closeDialog() {
      this.dialogRef.close();
  }

  closeTab() {
    this.selectedButton = 0;
  }

  closeTabGroup() {
    this.tabGroupIsOpen = false;
  }

  selectButton(buttonNumber: number) {
    this.selectedButton = buttonNumber;
  }
}
