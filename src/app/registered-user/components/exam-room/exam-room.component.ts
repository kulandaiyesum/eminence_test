import { Component, OnInit } from '@angular/core';
import { ExamRoomService } from '../../service/exam-room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss'],
})
export class ExamRoomComponent implements OnInit {
  joinLink: string = '';
  inviteEmail: string = '';

  constructor(
    private examRoomService: ExamRoomService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  joinRoom() {
    if (!this.joinLink) {
      console.log('Enter something.');
    }
    console.log(this.joinLink);
    this.examRoomService.joinExam(this.joinLink).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  sendInvite() {
    // Your logic to send the invite goes here
    console.log('Sending invite to:', this.inviteEmail);
  }
}
