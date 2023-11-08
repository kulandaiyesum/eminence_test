import { Component } from '@angular/core';

export interface SerumValue {
  referenceRange: string;
  referenceInterval: string;
  subject: string;

}

@Component({
  selector: 'app-serum-values',
  templateUrl: './serum-values.component.html',
  styleUrls: ['./serum-values.component.scss'],
})
export class SerumValuesComponent {
  serumColumns: string[] = ['subject','referenceRange', 'referenceInterval'];
  serumValues: SerumValue[] = [
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},
    {subject:'Biochemistry' , referenceRange: '136–146 mEq/L', referenceInterval:'136–146 mmol/L'},

  ];
}
