import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionPopupComponent } from '../subscription-popup/subscription-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  displayedColumns: string[] = ['instituteName', 'instituteId', 'packageType', 'packageTypeId'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  metaData = [
    { instituteName: 'Institute A', instituteId: 1, packageType: 'Type 1', packageTypeId: 101 },
    { instituteName: 'Institute B', instituteId: 2, packageType: 'Type 2', packageTypeId: 102 },
    { instituteName: 'Institute C', instituteId: 3, packageType: 'Type 1', packageTypeId: 101 },
    { instituteName: 'Institute D', instituteId: 4, packageType: 'Type 3', packageTypeId: 104 },
    // Add more data as needed
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.metaData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.metaData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // Reset sort to its initial state
    this.dataSource.sort?.sort({ id: '', start: 'asc', disableClear: false });
  }
}
