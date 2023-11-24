import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-lab-values',
  templateUrl: './lab-values.component.html',
  styleUrls: ['./lab-values.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':leave', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('600ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':enter', [
        animate('600ms', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class LabValuesComponent {
  selectedButton: number = 1;
  tabGroupIsOpen: boolean;

  constructor(public dialogRef: MatDialogRef<LabValuesComponent>) {}

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
