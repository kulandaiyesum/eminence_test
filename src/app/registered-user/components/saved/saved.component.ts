import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Scrollbar from 'smooth-scrollbar';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { ExamService } from '../../service/exam.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/faculty/components/question/question.component';
import { QuestionsComponent } from '../questions/questions.component';
import { PrivateExamService } from '../../service/private-exam.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent {


  translateValue = 0; // Initial translation value
  // slideWidth = 300; // Adjust this based on your slide width
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('scrollContainerTable') scrollContainerTable: ElementRef;
  currentSlideIndex = 0;
  numVisibleSlides = 3;
  public userId: string;
  public userEmail: string;
  secretKey: string = environment.secretKey;
  examArray: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['createdBy', 'roomCode', 'noOfPeople','activeEmails', 'inactiveEmails', 'review'];
  constructor(
    private animationBuilder: AnimationBuilder,
    private rsaService: RsaService,
    public dialog: MatDialog,
    private examService: ExamService,
    private privateExamService:PrivateExamService
  ) {}

  ngOnInit(): void {
    this.updateNumVisibleSlides(window.innerWidth);
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );

    this.userEmail = this.rsaService.decryptText(
      localStorage.getItem('10'),
      this.secretKey
    );
    console.log(this.userEmail);
    this.getExamDetails(this.userId);
    this.getHostExamRoomHistory();
  }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
    const scrollbars = Scrollbar.init(this.scrollContainerTable.nativeElement, {
      // Smooth Scrollbar options go here
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateNumVisibleSlides(event.target.innerWidth);
  }

  updateNumVisibleSlides(windowWidth: number) {
    if (windowWidth <= 768) {
      this.numVisibleSlides = 1;
    } else if (windowWidth <= 1024) {
      this.numVisibleSlides = 2;
    } else {
      this.numVisibleSlides = 3;
    }
  }

  getExamDetails(userid: string) {
    this.examService.getExamDetailsByStudentId(userid).subscribe(
      (response: any) => {
        this.examArray = response.result;
        // console.log(this.examArray);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getQuestions(row) {
    this.examService.getQuestionByExamId(row).subscribe((doc: any) => {
      const dataToPass = {
        result: doc.result,
        row: row,
      };
      this.dialog.open(QuestionsComponent, {
        width: 'auto',
        height: 'auto',
        data: dataToPass,
      });
      // dialogRef.afterClosed().subscribe((result) => {});
    });
  }

  getHostExamRoomHistory() {
    this.privateExamService.getHostExamHistory(this.userEmail).subscribe(
      (response:any) => {
        console.log(response.result);
        this.dataSource.data = response.result;
        const transformedData = response.result.map(room => ({
          ...room,
          noOfPeople: room.emails.length
        }));
        this.dataSource.data = transformedData;
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
