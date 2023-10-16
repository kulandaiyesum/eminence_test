import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from '../../service/package.service';
import { Package } from '../../model/package.class';
import { PackagePopupComponent } from '../package-popup/package-popup.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { SubscriptionService } from '../../service/subscription.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent implements OnInit {
  displayedColumns: string[] = [
    'packageName',
    'type',
    'questionsCount',
    'amount',
    'rate',
    'durationType',
    'action',
  ];
  dataSource: MatTableDataSource<Package>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  packageData: any;
  public instituteDetails = [];
  public subscriptionList = [];

  constructor(
    private packageService: PackageService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public instituteService: InstituteserviceService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadPackageData();
    this.getAllDataOfSubscription();
  }

  loadPackageData() {
    this.packageService.getAllPackages().subscribe(
      (packages: any) => {
        this.packageData = packages.result;

        this.packageData.forEach((pkg: Package) => {
          if (pkg.type === 'b2c') {
            pkg.questionsCount = 'UNLIMITED';
          }
        });

        this.dataSource = new MatTableDataSource(this.packageData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.toastr.error(error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  getAllInstituteData() {
    this.instituteService.getAllInstitute().subscribe(
      (response: any) => {
        this.instituteDetails = response.result;
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
  }

  getAllDataOfSubscription() {
    this.subscriptionService.getAllSubscriptions().subscribe((data: any) => {
      this.subscriptionList = data.result;
    });
  }

  openAddPackagePopup() {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(
      PackagePopupComponent,
      dialogBoxSettings
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.loadPackageData();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPackage(element: Package) {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
      data: element,
    };
    const dialogRef = this.dialog.open(
      PackagePopupComponent,
      dialogBoxSettings
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.loadPackageData();
    });
  }

  deletePackage(element: Package) {
    const isIdInResponse = this.subscriptionList.some(
      (item) => item.packageId._id === element._id
    );

    if (isIdInResponse) {
      Swal.fire({
        title: 'You cannot delete package in use',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this package.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.packageService.deletePackage(element).subscribe(
            (response: any) => {
              this.toastr.success(response.message, '', {
                timeOut: 3000,
              });
              this.loadPackageData();
            },
            (error) => {
              this.toastr.error(error.message, '', {
                timeOut: 3000,
              });
            }
          );
        }
      });
    }
  }
}
