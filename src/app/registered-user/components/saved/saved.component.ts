import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Scrollbar from 'smooth-scrollbar';

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

  currentIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.examDetails);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
  }

  moveSlide(direction: number) {
    if (direction === 1 && this.currentIndex < this.roomHistory.length - 1) {
      this.currentIndex++;
    } else if (direction === -1 && this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
