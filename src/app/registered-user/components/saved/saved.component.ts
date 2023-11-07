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

  slides = [
    { title: 'Slide 1', content: 'Content for Slide 1' },
    { title: 'Slide 2', content: 'Content for Slide 2' },
    { title: 'Slide 3', content: 'Content for Slide 3' },
    { title: 'Slide 4', content: 'Content for Slide 1' },
    { title: 'Slide 5', content: 'Content for Slide 2' },
    { title: 'Slide 6', content: 'Content for Slide 3' },
    { title: 'Slide 7', content: 'Content for Slide 1' },
    { title: 'Slide 8', content: 'Content for Slide 2' },
    { title: 'Slide 9', content: 'Content for Slide 3' },
    { title: 'Slide 10', content: 'Content for Slide 1' },
    { title: 'Slide 12', content: 'Content for Slide 2' },
    { title: 'Slide 11', content: 'Content for Slide 3' },
  ];

  dataSource: MatTableDataSource<any>;
  examDetails = [
    {
      date: '12-11-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    {
      date: '12-15-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    {
      date: '11-22-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    {
      date: '11-20-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    {
      date: '09-10-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    {
      date: '09-12-23',
      mode: 'timed',
      question: 10,
      subject: 'Multiple',
      system: 'core',
      score: 98,
    },
    // Add more data rows here
  ];

  translateValue = 0; // Initial translation value
  // slideWidth = 300; // Adjust this based on your slide width

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  currentSlideIndex = 0;
  numVisibleSlides = 3;
  public userId: string;
  secretKey: string = environment.secretKey;
  examArray:any[]=[];
  constructor(
    private animationBuilder: AnimationBuilder,
    private rsaService: RsaService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.updateNumVisibleSlides(window.innerWidth);
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    console.log(this.userId);
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
        this.examArray=response.result.filter((item:any)=> item.mode != null);
        console.log(this.examArray);

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
