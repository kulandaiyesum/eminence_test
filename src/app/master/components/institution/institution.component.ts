import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Institution } from '../../model/institution.class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
    this.initForm();
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
}
