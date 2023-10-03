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
  displayedColumns: string[] = ['date','input', 'question', 'from', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data = [
    {
      input: 'Function of heart',
      question: '10',
      from: 'Ask Eminence',
      action: 'Action 1',
      date: '12-09-2023',
    },
    {
      input: 'Bacteria',
      question: '6',
      from: 'Ask Eminence',
      action: 'Action 2',
      date: '19-09-2023',
    },
    {
      input: 'Voltage-gated',
      question: '7',
      from: 'QGen',
      action: 'Action 3',
      date: '21-09-2023',
    },
    {
      input: 'Calcium-gated',
      question: '10',
      from: 'Ask Eminence',
      action: 'Action 4',
      date: '25-09-2023',
    },
    {
      input: 'lungs',
      question: ' 5',
      from: 'QGen',
      action: 'Action 5',
      date: '29-09-2023',
    },
    {
      input: 'Brain',
      question: ' 6',
      from: 'Ask Eminence',
      action: 'Action 6',
      date: '30-09-2023',
    },
    {
      input: 'skin',
      question: ' 7',
      from: 'QGen',
      action: 'Action 7',
      date: '01-10-2023',
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
