import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SerumValuesComponent } from '../serum-values/serum-values.component';

@Component({
  selector: 'app-lab-values',
  templateUrl: './lab-values.component.html',
  styleUrls: ['./lab-values.component.scss'],
})
export class LabValuesComponent {
  selectedButton: number = 1;
  tabGroupIsOpen: boolean;
  @Output() closeLabValue = new EventEmitter<any>();
  constructor() {}

  closeDialog() {
    this.closeLabValue.emit('close lab value');
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
