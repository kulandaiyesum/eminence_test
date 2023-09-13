import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us-about-us',
  templateUrl: './contact-us-about-us.component.html',
  styleUrls: ['./contact-us-about-us.component.scss'],
})
export class ContactUsAboutUsComponent implements OnInit {
  contactUsForm!: FormGroup;
  constructor() {}
  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    console.log(this.contactUsForm.value);
    this.contactUsForm.reset();
  }
}
