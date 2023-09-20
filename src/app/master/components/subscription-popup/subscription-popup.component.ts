import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-subscription-popup',
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss'],
})
export class SubscriptionPopupComponent {
  items: string[] = [];
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  instituteNameData: string[] = [];
  public instituteData;
  filteredOptions: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SubscriptionPopupComponent>,
    private instituteService: InstituteserviceService
  ) {
    console.log(data);
    this.items = data;
  }

  ngOnInit() {
    this.getAllInstituteData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.instituteNameData.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAllInstituteData() {
    this.instituteService.getAllInstitute().subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.result);
        this.instituteData = response.result;
        this.instituteNameData = response.result.map((item) => item.name);
        console.log(this.instituteNameData);
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.viewValue;
    const selectedItem = this.instituteData.find(
      (item) => item.name === selectedOption
    );

    if (selectedItem) {
      const selectedId = selectedItem._id;
      console.log('Selected:', selectedOption);
      console.log('ID:', selectedId);
    } else {
      console.log('Selected option not found in the data.');
    }
  }
}
