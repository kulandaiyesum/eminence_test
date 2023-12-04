import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  constructor(public dialogRef: MatDialogRef<CalculatorComponent>) {}
  display: string = '';
  calculatorVisible: boolean = true;
  memoryValue: number = 0;
  operandHolder: string = '';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let key = event.key.toString();
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    if (digits.indexOf(key) != -1) {
      this.appendToDisplay(key);
    }
    if (event.keyCode == 8) {
      this.backspace();
    }
    if (event.keyCode == 13) {
      this.calculateResult();
    }
    if (event.keyCode == 27) {
      this.clearDisplay();
    }
    let operations = ['+', '-', '*', '/'];
    if (operations.indexOf(key) != -1) {
      this.appendOperator(key);
    }
    if (key == '%') {
      this.singleton('percent', -1);
    }
  }

  appendOperator(value: string) {
    const operations = ['-', '+', '*', '/'];
    if (this.operandHolder === '') {
      this.operandHolder = value;
      this.display += value;
    } else if (this.operandHolder && operations.includes(value)) {
      return;
    } else {
      this.display += value;
    }
    console.log('this.display', this.display);
  }
  appendToDisplay(value: string) {
    let digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (this.display === 'Error' || this.display === 'NaN') {
      this.display = '';
    }
    if (
      (this.display === '0' ||
        this.display === '00' ||
        this.display === '000') &&
      digits.includes(value)
    ) {
      this.display = value;
    } else {
      this.display += value;
    }
  }

  singleton(operand: string, value: number) {
    let result: number = 0;
    switch (operand) {
      case 'invert':
        result = +this.display * value;
        break;
      case 'sqrt':
        result = Math.sqrt(+this.display);
        break;
      case 'div':
        result = 1 / +this.display;
        break;
    }
    this.display = '' + result;
  }

  clearDisplay() {
    this.display = '';
    this.operandHolder = '';
  }

  backspace() {
    if (this.display === 'Error' || this.display === 'NaN') {
      this.display = '';
      return;
    }
    this.display = this.display.slice(0, -1);
  }

  closeCalculator() {
    this.display = '';
    this.calculatorVisible = false;
    this.operandHolder = '';
  }

  calculateResult() {
    try {
      this.display = eval(this.display);
    } catch (error) {
      this.display = 'Error';
    } finally {
      this.operandHolder = '';
    }
  }

  memoryAdd() {
    this.operandHolder = '';
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
