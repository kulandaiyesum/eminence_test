import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from '../../service/package.service';
import { Package } from '../../model/package.class';
import { PackagePopupComponent } from '../package-popup/package-popup.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  packageForm: FormGroup;

  displayedColumns: string[] = [
    'packageName',
    'type',
    'questionsCount',
    'amount',
    'rate',
    'durationType',
    'durationCount',
    'action',
  ];
  dataSource: MatTableDataSource<Package>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  packageData: any;

  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    public dialog: MatDialog
  ) {
    this.packageForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      questionsCount: ['', Validators.required],
      amount: ['', Validators.required],
      rate: ['', Validators.required],
      topicId: ['', Validators.required],
      durationType: ['', Validators.required],
      durationCount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPackageData();
  }

  loadPackageData() {
    this.packageService.getAllPackages().subscribe(
      (packages: any) => {
        this.packageData = packages.result;
        console.log(this.packageData);
        this.dataSource = new MatTableDataSource(this.packageData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Failed to load packages', error);
      }
    );
  }

  openAddPackagePopup() {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      // height:'80vh',
      // overflow: 'auto',
    };
    const dialogRef = this.dialog.open(
      PackagePopupComponent,
      dialogBoxSettings
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPackageData();
      }
    });
  }

  onPackageSubmit() {
    if (this.packageForm.valid) {
      const packageData = this.packageForm.value as Package;
      this.packageService.createPackage(packageData).subscribe(
        (response) => {
          console.log('Package created successfully', response);
          this.packageForm.reset();
          this.loadPackageData();
        },
        (error) => {
          console.error('Failed to create package', error);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPackage(element: Package) {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      // height:'80vh',
      // overflow: 'auto',

      data: { packageData: element },
    };
    const dialogRef = this.dialog.open(
      PackagePopupComponent,
      dialogBoxSettings
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPackageData();
      }
    });
  }

  deletePackage(element: Package) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this package.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        this.packageService.deletePackage(element).subscribe(
          (response) => {
            console.log('Package deleted successfully', response);
            this.loadPackageData();
          },
          (error) => {
            console.error('Failed to delete package', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No, keep it" or closed the dialog
        Swal.fire('Cancelled', 'The package is not deleted.', 'info');
      }
    });
  }
}
