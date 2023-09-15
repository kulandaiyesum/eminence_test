import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Institution } from '../../model/institution.class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { InstitutePopupComponent } from '../institute-popup/institute-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {
  instituteForm: FormGroup;
  hidePassword: boolean = true;
  secretKeyLength = 32;
  secretKey = environment.secretKey;


  public institutionModel:Institution={
    name: '',
    email: '',
    address: ''
  }

  instituteData=[
    {
      name: 'AVM',
      id: '1',
      email: 'AVM2gmail.com',
      address: 'Main road',
    },
    {
      name: 'BVM',
      id: '2',
      email: 'BVM2gmail.com',
      address: 'Tirupati road',
    },
    {
      name: 'IMS',
      id: '3',
      email: 'IMS2gmail.com',
      address: 'Trichy road',
    },

  ]
  displayedColumns: string[] = ['name', 'id', 'email', 'address'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.instituteData);
   }

  ngOnInit(): void {
    this.initForm();
    console.log(this.instituteData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initForm() {
    this.instituteForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onInstituteSubmit() {
    console.log("submitted");
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);
    this.instituteForm.controls['address'].setValue(this.institutionModel.address);
    if (this.instituteForm.valid) {
      console.log(this.instituteForm.value);
    }
  }
  addData(){
    const dialogRef = this.dialog.open(InstitutePopupComponent, {
      width: '350px',
      height: 'auto',
      data: 'Message from header',
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
