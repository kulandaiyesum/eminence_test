import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateExamService } from '../../service/private-exam.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  roomCode: string;
  constructor(
    private route: ActivatedRoute,
    private privateExamRoomService: PrivateExamService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const otp = params['otp'];
      this.roomCode = otp;
    });
    this.getLandingPageDetails();
  }

  getLandingPageDetails() {
    let data = {
      otp: this.roomCode,
    };
    console.log(data);

    this.privateExamRoomService.getLandingPage(data).subscribe(
      (response: any) => {
        this.roomCode = response.getUser.roomCode;
        console.log(response.activeUse);
      },
      (error) => {
        console.error('Error fetching random code:', error);
      }
    );
  }
}
