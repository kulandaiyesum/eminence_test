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

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent {
  displayedColumns: string[] = [
    'date',
    'mode',
    'question',
    'subject',
    'system',
    'score',
  ];
  public slides = [];
  translateValue = 0; // Initial translation value
  // slideWidth = 300; // Adjust this based on your slide width

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  currentSlideIndex = 0;
  numVisibleSlides = 3;
  public userId: string;
  secretKey: string = environment.secretKey;
  examArray: any[] = [];
  constructor(
    private animationBuilder: AnimationBuilder,
    private rsaService: RsaService,
    public dialog: MatDialog,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.updateNumVisibleSlides(window.innerWidth);
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.getExamDetails(this.userId);
  }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
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
        this.examArray = response.result.filter(
          (item: any) => item.mode != null
        );
        this.slides = this.examArray;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getQuestions(row) {
    console.log(row);
    this.examService.getQuestionByExamId(row).subscribe((doc: any) => {
      this.dialog.open(QuestionsComponent, {
        width: '1500px',
        data: doc.result,
      });
      // dialogRef.afterClosed().subscribe((result) => {});
    });
  }
}
