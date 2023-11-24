import { Component, Inject } from '@angular/core';
import { ExamService } from '../../service/exam.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sendcode } from '../../model/sendcode.class';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import { PrivateExamService } from '../../service/private-exam.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss'],
})
export class SendInviteComponent {
  public uniqueCode;
  public question = [];
  public questionCount = [];
  public emailArray = [];
  public idArray;
  secretKey = environment.secretKey;
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

  noActiveMembers: string[] = [];
  showSendEmail: boolean = true;
  showCreateQuestions: boolean = false;
  showGenerateRoom: boolean = false;
  constructor(
    private examService: ExamService,
    public dialogRef: MatDialogRef<SendInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private questionService: QuerstionService,
    private loginService: LoginService,
    private privateExamService: PrivateExamService
  ) {}

  ngOnInit(): void {
    this.getRandomCodeForEmail();
    const mail = localStorage.getItem('10');
    this.sendCode.email = this.loginService.decryptText(mail, this.secretKey);
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
      console.log(this.sendCode.email);
      let emailArrayNew = this.sendCode.email.split(',');
      const emailArray = this.sendCode.email
        .split(',')
        .map((email) => ({ email: email.trim() }));
      this.inviteObject.email = emailArrayNew;
      this.inviteObject.otp = this.sendCode.otp;
      this.examService.sendExamCode(this.inviteObject).subscribe(
        (response: any) => {
          console.log(response);
          console.log(response.result.users);
          this.questionCount = response.result.users;
          this.emailArray = this.questionCount.map((obj) => obj.email);
          console.log(this.emailArray, 'ssssssssssss');

          // Extract email addresses from the post method response
          const responseEmails = response.result.users
            .filter((response) => response !== null)
            .map((response) => response.email);

          // Filter out the email addresses that are not present in the post method response
          const notPresentEmails = emailArrayNew.filter(
            (email) => !responseEmails.includes(email)
          );
          this.noActiveMembers = notPresentEmails;
          this.toastr.success('Email sent succesfully', '', {
            timeOut: 3000,
          });
          this.showCreateQuestions = true;
          this.showSendEmail = false;
          this.sendCode.email = '';
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
  createQusetion() {
    this.questionService.postQbankRequest(this.data).subscribe(
      (doc: any) => {
        console.log(doc.result);
        this.question = doc.result;
        this.idArray = this.question.map((obj) => obj._id);
        this.toastr.success('Question created successfully !!!', '', {
          timeOut: 3000,
        });
        this.showSendEmail = false;
        this.showCreateQuestions = false;
        this.showGenerateRoom = true;
        console.log(this.idArray);
      },
      (error) => {
        console.error('Oops something went', error);
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
  generateQusetion() {
    let data = {
      questionIds: this.idArray,
      roomCode: this.sendCode.otp,
      emails: this.emailArray,
    };
    console.log(data);
    this.privateExamService.savePrivateExam(data).subscribe(
      (doc: any) => {
        console.log(doc.result);
        this.closeDialog();
        this.toastr.success('Room created successfully !!!', '', {
          timeOut: 3000,
        });
      },

      (error) => {
        console.error('Oops something went', error);
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
}
