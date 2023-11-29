import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamRoomService } from '../../service/exam-room.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  roomCode: string;
  constructor(
    private route: ActivatedRoute,
    private examroomService: ExamRoomService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const otp = params['otp'];
      const email = params['email'];
      console.log(otp);
      this.roomCode = otp;
      console.log(email);
      // Now you can use otp and email in your component
      this.getLandingPageDetails();
    });
  }

  getLandingPageDetails() {
    let data={
      otp:this.roomCode
    }
    this.examroomService.getLandingPage(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching random code:', error);
      }
    );
  }
}
