import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionPopupComponent } from '../subscription-popup/subscription-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionService } from '../../service/subscription.service';
import { UpdateSubscriptionComponent } from '../update-subscription/update-subscription.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  displayedColumns: string[] = [
    'instituteName',
    'type',
    'instituteId',
    'packageType',
    'packageTypeId',
    'questionsCountResetDate',
    'action',
  ];
  dataSource;
  public subscriptionList;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
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
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    // // Reset sort to its initial state
    // this.dataSource.sort?.sort({ id: '', start: 'asc', disableClear: false });

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateSubscription(data: any) {
    const dialogOptios = {
      width: '600px',
      margin: '0 auto',
      data: data,
    };
    const dialogRef = this.dialog.open(
      UpdateSubscriptionComponent,
      dialogOptios
    );
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getAllData();
    });
  }

  deleteSubscription(data: any) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptionService.deleteSubscription(data).subscribe(
          (res: any) => {
            this.toastr.success(res.message, '', {
              timeOut: 3000,
            });
            this.getAllData();
          },
          (err) => {
            this.toastr.error(err.error.message, '', {
              timeOut: 3000,
            });
          }
        );
      }
    });
  }
}
