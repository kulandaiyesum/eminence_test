import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  displayedColumns: string[] = ['input', 'question', 'from', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data = [
    {
      input: 'Input 1',
      question: 'Question 1',
      from: 'From 1',
      action: 'Action 1',
    },
    {
      input: 'Input 2',
      question: 'Question 2',
      from: 'From 2',
      action: 'Action 2',
    },
    {
      input: 'Input 3',
      question: 'Question 3',
      from: 'From 3',
      action: 'Action 3',
    },
    {
      input: 'Input 4',
      question: 'Question 4',
      from: 'From 4',
      action: 'Action 4',
    },
    {
      input: 'Input 5',
      question: 'Question 5',
      from: 'From 5',
      action: 'Action 5',
    },
    {
      input: 'Input 6',
      question: 'Question 6',
      from: 'From 6',
      action: 'Action 6',
    },
    {
      input: 'Input 7',
      question: 'Question 7',
      from: 'From 7',
      action: 'Action 7',
    },
    // Add more data as needed
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
