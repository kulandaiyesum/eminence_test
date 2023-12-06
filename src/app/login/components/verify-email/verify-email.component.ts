import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  verificationValue: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verificationValue = params['id'];
    });
    console.log(this.verificationValue);
  }
}
