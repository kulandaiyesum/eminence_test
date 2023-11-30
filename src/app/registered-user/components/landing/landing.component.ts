import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateExamService } from '../../service/private-exam.service';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  roomCode: string;
  hostMail:string;
  otpCode:string;
  attendedEmailArray;
  nonattendedEmailArray;
  secretKey = environment.secretKey;
  enableStartButton:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private privateExamRoomService: PrivateExamService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router


  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const otp = params['otp'];
      this.roomCode = otp;
    });
    const mail = localStorage.getItem('10');
    this.hostMail=this.loginService.decryptText(mail, this.secretKey);
    console.log(this.hostMail);

    this.getLandingPageDetails();
  }

  getLandingPageDetails() {
    let data = {
      roomCode: this.roomCode,
    };
    console.log(data);
    this.privateExamRoomService.getLandingPage(data).subscribe(
      (response: any) => {
        // this.roomCode = response.getUser.roomCode;
        console.log(response.activeUse);
        console.log(response.result.getUser.hostMail);
        console.log(response.result.activeUser);
        this.attendedEmailArray=response.result.activeUser
        this.nonattendedEmailArray=response.result.inactiveUser
        if (this.hostMail===response.result.getUser.hostMail) {
          console.log("You are host");
          this.enableStartButton=true
        }

      },
      (error) => {
        console.error('Error fetching random code:', error);
      }
    );
  }

  startExam(){
    let privateExam={
      roomCode:this.roomCode,
      email:this.hostMail
    }
     this.privateExamRoomService.joinExam(privateExam).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.result);
        const tempData = resp.result[0];
        if (tempData.length === 0) {
          this.toastr.warning('NO Questions Found !!!', '', {
            timeOut: 3000,
          });
        } else {
          // this.examDataService.setExamRoomData(tempData);
          localStorage.setItem('emex-td', JSON.stringify(tempData));
          localStorage.setItem('8', privateExam.roomCode);
          // localStorage.setItem('emm', this.qbankObject.mode);
          // if (this.qbankObject.mode === 'TUTOR') {
          // this.router.navigate(['/eminence/student/exam']);
          // } else {
          this.router.navigate(['/eminence/student/exam-timed']);
          // }
        }
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
}
