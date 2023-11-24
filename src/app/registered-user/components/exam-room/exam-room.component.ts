import { Component, OnInit } from '@angular/core';
import { ExamRoomService } from '../../service/exam-room.service';
import { ToastrService } from 'ngx-toastr';
import { PrivateExamService } from '../../service/private-exam.service';
import { PrivateExam } from '../../model/privateExam';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss'],
})
export class ExamRoomComponent implements OnInit {
  joinLink: string = '';
  inviteEmail: string = '';
  public privateExam: PrivateExam;
  secretKey = environment.secretKey;

  constructor(
    private examRoomService: ExamRoomService,
    private privateExamService: PrivateExamService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.privateExam = new PrivateExam();
    const mail = localStorage.getItem('10');
    this.privateExam.email = this.loginService.decryptText(
      mail,
      this.secretKey
    );
  }

  joinRoom() {
    if (!this.joinLink) {
      console.log('Enter something.');
    }
    console.log(this.joinLink);
  }

  sendInvite() {
    // Your logic to send the invite goes here
    console.log('Sending invite to:', this.inviteEmail);
  }

  goRoom() {
    this.privateExamService.joinExam(this.privateExam).subscribe(
      (resp: any) => {
        console.log(resp);
        const tempData = resp.result[1];
        if (tempData.length === 0) {
          this.toastr.warning('NO Questions Found !!!', '', {
            timeOut: 3000,
          });
        } else {
          // this.examDataService.setExamRoomData(tempData);
          localStorage.setItem('emex-td', JSON.stringify(tempData));
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
