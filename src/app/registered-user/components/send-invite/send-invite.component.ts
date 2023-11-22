import { Component } from '@angular/core';
import { ExamService } from '../../service/exam.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Sendcode } from '../../model/sendcode.class';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss'],
})
export class SendInviteComponent {
  public uniqueCode;
  public sendCode: Sendcode = {
    otp: '',
    email: '',
  };

  public inviteObject: {
    email: any;
    otp: string;
  } = {
    otp: '',
    email: undefined,
  };

  noActiveMembers:string[]=[];
  constructor(
    private examService: ExamService,
    public dialogRef: MatDialogRef<SendInviteComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRandomCodeForEmail();
    console.log(this.sendCode);

    const emailAddresses = [
      'shekm@datapattern.ai',
      'shekshowkath2001ms@gmail.com',
      'shekshowkath2001m@gmail.com',
    ];

    // Assuming you have the post method response
    const postMethodResponse = [
      {
        _id: '6512f38ef71039a10b2ecc37',
        firstName: 'Senthil',
        lastName: 'Chinnasamy',
        email: 'shekm@datapattern.ai',
        password:
          '$2a$10$Hxuo.1TmHj1oshFRbZeUYOynkdkx2kkp/LQP7CIvLJ65/4mVS2bX.',
        status: 1,
        userCode: 1,
        default: 1,
        isDeleted: false,
        role: '6512f38ef71039a10b2ecc32',
        modifiedAt: '2023-10-07 11:38:07',
      },
      {
        _id: '6512f38ef71039a10b2ecc37',
        firstName: 'Senthil',
        lastName: 'Chinnasamy',
        email: 'shekshowkath2001ms@gmail.com',
        password:
          '$2a$10$Hxuo.1TmHj1oshFRbZeUYOynkdkx2kkp/LQP7CIvLJ65/4mVS2bX.',
        status: 1,
        userCode: 1,
        default: 1,
        isDeleted: false,
        role: '6512f38ef71039a10b2ecc32',
        modifiedAt: '2023-10-07 11:38:07',
      },
      {
        _id: '6512f38ef71039a10b2ecc37',
        firstName: 'Senthil',
        lastName: 'Chinnasamy',
        email: 'shekshowkathxj2001m@gmail.com',
        password:
          '$2a$10$Hxuo.1TmHj1oshFRbZeUYOynkdkx2kkp/LQP7CIvLJ65/4mVS2bX.',
        status: 1,
        userCode: 1,
        default: 1,
        isDeleted: false,
        role: '6512f38ef71039a10b2ecc32',
        modifiedAt: '2023-10-07 11:38:07',
      },
      null,
    ];

    // Extract email addresses from the post method response
    const responseEmails = postMethodResponse
      .filter((response) => response !== null)
      .map((response) => response.email);

    // Filter out the email addresses that are not present in the post method response
    const notPresentEmails = emailAddresses.filter(
      (email) => !responseEmails.includes(email)
    );

    console.log(notPresentEmails);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  closeDialogStartnoew(): void {
    this.dialogRef.close();
    localStorage.setItem('8', this.sendCode.otp);
  }

  getRandomCodeForEmail() {
    this.examService.getRandomCode().subscribe(
      (response: any) => {
        console.log(response);
        this.uniqueCode = response.result;
        this.sendCode.otp = response.result;
      },
      (error) => {
        console.error('Error fetching random code:', error);
      }
    );
  }

  isValidEmail(): boolean {
    return !!this.sendCode.email; // You can add more validation as needed
  }

  sendInvite(form: NgForm): void {
    if (form.valid) {
      // Your logic to send the invite using this.sendCode.email
      console.log(this.sendCode.email);
      let emailArrayNew = this.sendCode.email.split(',');
      console.log(emailArrayNew);

      const emailArray = this.sendCode.email
        .split(',')
        .map((email) => ({ email: email.trim() }));
      // console.log(emailArray);
      this.inviteObject.email = emailArrayNew;
      this.inviteObject.otp = this.sendCode.otp;

      console.log('Sending invite to:', this.inviteObject);
      this.examService.sendExamCode(this.inviteObject).subscribe(
        (response: any) => {
          console.log(response);
          console.log(response.result.users);

          // Extract email addresses from the post method response
          const responseEmails = response.result.users
            .filter((response) => response !== null)
            .map((response) => response.email);

          // Filter out the email addresses that are not present in the post method response
          const notPresentEmails = emailArrayNew.filter(
            (email) => !responseEmails.includes(email)
          );

          console.log(notPresentEmails);
          this.noActiveMembers=notPresentEmails;

          this.toastr.success('Email sent succesfully', '', {
            timeOut: 3000,
          });
        },
        (error) => {
          console.error('Error sending code :', error);
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
