import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  verificationValue: string = '';
  public decodedPlainText;
  public id;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verificationValue = params['id'];
    });
    this.decodedPlainText = atob(this.verificationValue);
    this.id = JSON.parse(this.decodedPlainText);
    console.log(this.id);
  }
  getVerify() {
    this.loginService.verifyText(this.id).subscribe(
      (doc: any) => {
        // console.log(doc);
        Swal.fire({
          icon: 'success',
          title: 'Your email has been verified!',
          showConfirmButton: false,
          timer: 2000,
        }).then((v) => {
          // console.log(v);
          this.router.navigate(['/home']);
        });
      },
      (err: any) => {
        this.toaster.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
}
