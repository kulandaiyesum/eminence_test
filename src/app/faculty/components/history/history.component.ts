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
      input: 'Function of heart',
      question: '10',
      from: 'Ask eminence',
      action: 'Action 1',
    },
    {
      input: 'Bacteria',
      question: '6',
      from: 'Ask eminence',
      action: 'Action 2',
    },
    {
      input: 'Voltage-gated',
      question: '7',
      from: 'Editor',
      action: 'Action 3',
    },
    {
      input: 'Calcium-gated',
      question: '10',
      from: 'Ask eminence',
      action: 'Action 4',
    },
    {
      input: 'lungs',
      question: ' 5',
      from: 'Editor',
      action: 'Action 5',
    },
    {
      input: 'Brain',
      question: ' 6',
      from: 'Ask eminence',
      action: 'Action 6',
    },
    {
      input: 'skin',
      question: ' 7',
      from: 'Editor',
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
