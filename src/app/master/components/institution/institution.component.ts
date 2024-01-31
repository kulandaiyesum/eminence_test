import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Institution } from '../../model/institution.class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { InstitutePopupComponent } from '../institute-popup/institute-popup.component';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { PackageService } from '../../service/package.service';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';
import { SubscriptionService } from '../../service/subscription.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ViewInstitutionComponent } from '../view-institution/view-institution.component';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss'],
})
export class InstitutionComponent {
  instituteForm: FormGroup;
  hidePassword: boolean = true;
  secretKeyLength = 32;
  secretKey = environment.secretKey;
  elementStatus = true;

  displayedColumns: string[] = [
    'name',
    'email',
    'city',
    'status',
    'action',
    'add',
  ];
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public instituteDetails: any;

  public subscriptionList = [];

  public institutionModel: Institution = {
    name: '',
    email: '',
    userId: '',
    _id: '',
    address: '',
    state: '',
    zip: '',
    packageName: '',
    questionsCount: '',
    packageNameId: '',
    city: '',
    institutionId: '',
    startdate: new Date(),
    enddate: new Date(),
    durationType: '',
    country: '',
    questionsCountResetDate: new Date(),
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public instituteService: InstituteserviceService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllInstituteData();
    this.getAllDataOfSubscription();
  }

  initForm() {
    this.instituteForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      state: ['', Validators.required],
      _id: [''],
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  toggleStatus() {
    this.elementStatus = !this.elementStatus;
  }

  onInstituteSubmit() {
    console.log('submitted');
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);

    if (this.instituteForm.valid) {
      console.log(this.instituteForm.value);
    }
  }
  addData() {
    const dialogRef = this.dialog.open(InstitutePopupComponent, {
      width: '600px',
      height: '80vh',
      data: null,
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getAllInstituteData();
    });
  }

  getAllInstituteData() {
    this.instituteService.getAllInstitute().subscribe(
      (response: any) => {
        this.instituteDetails = response.result;
        this.dataSource = new MatTableDataSource(this.instituteDetails);
        // Connect the paginator and sort to the data source
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
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

  updateInstitute(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(InstitutePopupComponent, {
      width: '600px',
      height: '80vh',
      data: data,
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getAllInstituteData();
    });
  }

  getAllDataOfSubscription() {
    this.subscriptionService.getAllSubscriptions().subscribe((data: any) => {
      this.subscriptionList = data.result;
    });
  }

  deleteInstitute(element: any) {
    const isIdInResponse = this.subscriptionList.some(
      (item) => item.institutionId._id === element._id
    );

    if (isIdInResponse) {
      Swal.fire({
        title: 'This institution subscription is still valid',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed anyway',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'It will reflects on user and subscription',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              this.performDelete(element);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // The user clicked "Cancel" or closed the alert
          console.log('Cancel clicked');
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to delete?',
        text: 'It will reflects on user and subscription',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.performDelete(element);
        }
      });
    }
  }

  performDelete(element: any) {
    this.instituteService.deleteInstitution(element).subscribe(
      (response: any) => {
        this.toastr.success(response.message, '', {
          timeOut: 3000,
        });
        this.getAllInstituteData();
      },
      (error) => {
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
        this.getAllInstituteData();
        console.error('Delete failed', error);
      }
    );
  }

  addSubscription(data) {
    const dialogRef = this.dialog.open(AddSubscriptionComponent, {
      width: '600px',
      height: '80vh',
      data: { data: data, from: 'institution' },
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getAllInstituteData();
      this.getAllDataOfSubscription();
    });
  }

  /**
   * function to change the status of user/institute
   * @param elementId
   */
  changeStatus(elementId: string, status) {
    Swal.fire({
      title: 'Do you want to chnage status of the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.instituteService.changeStatus(elementId, status).subscribe(
          (response: any) => {
            this.toastr.success(response.message, 'Status changed', {
              timeOut: 3000,
            });
            this.getAllInstituteData();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Status changed', {
              timeOut: 3000,
            });
            this.getAllInstituteData();
            console.error('Delete failed', error);
          }
        );
      } else {
        this.getAllInstituteData();
      }
    });
  }

  viewInformation(institution: Institution) {
    const dialogOptions = {
      width: '600px',
      data: institution,
    };
    const dialogRef = this.dialog.open(ViewInstitutionComponent, dialogOptions);
  }
}
