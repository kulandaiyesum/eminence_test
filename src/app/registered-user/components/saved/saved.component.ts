import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Scrollbar from 'smooth-scrollbar';
import { AnimationBuilder, style, animate } from '@angular/animations';

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
  images = [
    [
      { title: 'Slide 1', content: 'Content for Slide 1' },
      { title: 'Slide 2', content: 'Content for Slide 2' },
      { title: 'Slide 3', content: 'Content for Slide 3' },
    ],
    [
      { title: 'Slide 4', content: 'Content for Slide 4' },
      { title: 'Slide 5', content: 'Content for Slide 5' },
      { title: 'Slide 6', content: 'Content for Slide 6' },
    ],
    [
      { title: 'Slide 7', content: 'Content for Slide 7' },
      { title: 'Slide 8', content: 'Content for Slide 8' },
      { title: 'Slide 9', content: 'Content for Slide 9' },
    ],
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

  roomHistory = [
    {
      title: 'Shek',
      subtitle: 'showkath',
    },
    {
      title: 'hari',
      subtitle: 'sudhan',
    },
    {
      title: 'sneha',
      subtitle: 'singh',
    },
    {
      title: 'tamil',
      subtitle: 'selvan',
    },
    {
      title: 'swathi ',
      subtitle: 'devasenapathy',
    },
    {
      title: 'nivitha',
      subtitle: 'nivitha',
    },
    {
      title: 'arun',
      subtitle: 'sridhar',
    },
    {
      title: 'dharu',
      subtitle: 'sebastin',
    },
  ];

  translateValue = 0; // Initial translation value
  // slideWidth = 300; // Adjust this based on your slide width

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  currentSlideIndex = 0;
  slidesData = [
    {
      title: 'Anatomy, Cardiovascular',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 4',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 5',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 6',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 7',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      title: 'Another Title 8',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
  ];
  constructor(private animationBuilder: AnimationBuilder) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.examDetails);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
  }
  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.animateSlider(-this.currentSlideIndex * this.slideWidth);
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < this.slidesData.length - 1) {
      this.currentSlideIndex++;
      this.animateSlider(-this.currentSlideIndex * this.slideWidth);
    }
  }

  animateSlider(value: number) {
    const factory = this.animationBuilder.build([
      animate('300ms', style({ transform: `translateX(${value}px)` })),
    ]);
    const player = factory.create(document.querySelector('.slider'));
    player.play();
  }

  get slideWidth() {
    // Calculate the slide width based on your design
    return window.innerWidth <= 767 ? window.innerWidth : 600;
  }
}
