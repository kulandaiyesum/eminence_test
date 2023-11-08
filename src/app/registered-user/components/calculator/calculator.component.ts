import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {

  constructor(public dialogRef: MatDialogRef<CalculatorComponent>,) {}
  display: string = '0';
  calculatorVisible: boolean = true;

  appendToDisplay(value: string) {
    this.display += value;
  }

  clearDisplay() {
    this.display = '';
  }

  backspace() {
    this.display = this.display.slice(0, -1);
  }
  closeCalculator() {
    this.display = '0';
    this.calculatorVisible = false;
  }

  calculateResult() {
    try {
      this.display = eval(this.display);
    } catch (error) {
      this.display = 'Error';
    }
  }

  memoryValue: number = 0;

  memoryAdd() {
    this.memoryValue += parseFloat(this.display);
  }

  memoryRecall() {
    this.display = this.memoryValue.toString();
  }

  memoryClear() {
    this.memoryValue = 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
