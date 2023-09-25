import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionPopupComponent } from '../subscription-popup/subscription-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionService } from '../../service/subscription.service';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  displayedColumns: string[] = [
    'instituteName',
    'instituteId',
    'packageType',
    'packageTypeId',
  ];
  dataSource;
  public subscriptionList;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.subscriptionService.getAllSubscriptions().subscribe((data: any) => {
      this.subscriptionList = data.result;
      this.dataSource = new MatTableDataSource(this.subscriptionList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
