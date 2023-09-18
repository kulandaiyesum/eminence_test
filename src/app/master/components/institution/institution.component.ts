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

interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
}

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
  displayedColumns: string[] = [
    'name',
    'mobile',
    'email',
    'address',
    'state',
    'action',
  ];
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public instituteDetails: any;

  public institutionModel: Institution = {
    name: '',
    email: '',
    address: '',
    mobile: '',
    state: '',
    _id: '',
  };

  // Sample data (replace with your own data source):
  data: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', address: ' Main St' },
    {
      id: 2,
      name: 'Harold Das',
      email: 'harold@example.com',
      address: ' pillayar kovil St',
    },
    {
      id: 3,
      name: 'MArk Antony',
      email: 'anton@example.com',
      address: ' Beach road St',
    },
    // Add more data as needed...
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public instituteService: InstituteserviceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllInstituteData();
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

  onInstituteSubmit() {
    console.log('submitted');
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);
    this.instituteForm.controls['address'].setValue(
      this.institutionModel.address
    );
    if (this.instituteForm.valid) {
      console.log(this.instituteForm.value);
    }
  }
  addData() {
    const dialogRef = this.dialog.open(InstitutePopupComponent, {
      width: '350px',
      height: 'auto',
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
        console.log(response);
        console.log(response.result);
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
      width: '350px',
      height: 'auto',
      data: data,
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteInstitute(element: any) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This action cannot be undone!',
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
  performDelete(element: any) {
    console.log(element);
    this.instituteService.deleteInstitution(element).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.error('Delete failed', error);
      }
    );
  }
}
