import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PrivateExamService } from '../../service/private-exam.service';
import { PrivateExam } from '../../model/privateExam';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/service/login.service';
import { Router } from '@angular/router';
import { LiveExamService } from '../../service/live-exam.service';
import { ExamService } from '../../service/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss'],
})
export class ExamRoomComponent implements OnInit {
  joinLink: string = '';
  public inviteEmail;
  public privateExam: PrivateExam;
  secretKey = environment.secretKey;

  constructor(
    private liveExamService: LiveExamService,
    private privateExamService: PrivateExamService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private examService: ExamService
  ) {}
  ngOnInit(): void {
    this.privateExam = new PrivateExam();
    const mail = localStorage.getItem('10');
    this.privateExam.email = this.loginService.decryptText(
      mail,
      this.secretKey
    );
  }
  liveExamRoom() {
    this.liveExamService.getQuestionsByTopic().subscribe((doc: any) => {
      console.log(doc);
      const tempData = doc.result;
      localStorage.setItem('emex-td', JSON.stringify(tempData));
      this.router.navigate(['/eminence/student/exam-timed']);
    });
  }
  joinRoom() {
    if (!this.joinLink) {
      console.log('Enter something.');
    }
    console.log(this.joinLink);
  }

  sendInvite() {
    let data = { email: this.inviteEmail };
    this.examService.recommendedEminenceAI(data).subscribe(
      (response: any) => {
        this.toastr.success('Invite send successfully', '', {
          timeOut: 3000,
        });
      },
      (error) => {
        console.error('Oops something went', error);
        this.toastr.error(error.error.message, 'Something went wrong', {
          timeOut: 3000,
        });
      }
    );
  }

  goRoom() {
    this.privateExamService.joinExam(this.privateExam).subscribe(
      (response: any) => {
        this.router.navigate([
          '/eminence/student/landing',
          this.privateExam.roomCode,
        ]);
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invaild Room Code!',
        });
      }
    );
    // this.privateExamService.joinExam(this.privateExam).subscribe(
    //   (resp: any) => {
    //     console.log(resp);
    //     console.log(resp.result);
    //     const tempData = resp.result[0];
    //     if (tempData.length === 0) {
    //       this.toastr.warning('NO Questions Found !!!', '', {
    //         timeOut: 3000,
    //       });
    //     } else {
    //       // this.examDataService.setExamRoomData(tempData);
    //       localStorage.setItem('emex-td', JSON.stringify(tempData));
    //       localStorage.setItem('8', this.privateExam.roomCode);
    //       // localStorage.setItem('emm', this.qbankObject.mode);
    //       // if (this.qbankObject.mode === 'TUTOR') {
    //       // this.router.navigate(['/eminence/student/exam']);
    //       // } else {
    //       this.router.navigate(['/eminence/student/exam-timed']);
    //       // }
    //     }
    //   },
    //   (err: any) => {
    //     this.toastr.error(err.error.message, '', {
    //       timeOut: 3000,
    //     });
    //   }
    // );
  }
}
