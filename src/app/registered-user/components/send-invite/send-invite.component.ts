import { Component } from '@angular/core';
import { ExamService } from '../../service/exam.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss'],
})
export class SendInviteComponent {
  public uniqueCode: string;
  constructor(
    private examService: ExamService,
    public dialogRef: MatDialogRef<SendInviteComponent>
  ) {}

  ngOnInit(): void {
    this.uniqueCode = this.examService.generateCode();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
