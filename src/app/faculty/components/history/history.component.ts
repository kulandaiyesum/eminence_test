import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QgenService } from '../../service/qgen.service';
import { environment } from 'src/environments/environment';
import { RsaService } from 'src/app/shared/service/rsa.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'input', 'question', 'from', 'action'];
  public userId;
  public qgenList;
  secretKey: string = environment.secretKey;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data = [
    {
      input: 'Function of heart',
      question: '10',
      from: 'Ask Eminence',
      action: 'Action 1',
      date: '09-08-2023',
    },
    {
      input: 'Bacteria',
      question: '6',
      from: 'Ask Eminence',
      action: 'Action 2',
      date: '09-15-2023',
    },
    {
      input: 'Voltage-gated',
      question: '7',
      from: 'QGen',
      action: 'Action 3',
      date: '09-18-2023',
    },
    {
      input: 'Calcium-gated',
      question: '10',
      from: 'Ask Eminence',
      action: 'Action 4',
      date: '09-24-2023',
    },
    {
      input: 'lungs',
      question: ' 5',
      from: 'QGen',
      action: 'Action 5',
      date: '09-28-2023',
    },
    {
      input: 'Brain',
      question: ' 6',
      from: 'Ask Eminence',
      action: 'Action 6',
      date: '09-30-2023',
    },
    {
      input: 'skin',
      question: ' 7',
      from: 'QGen',
      action: 'Action 7',
      date: '10-01-2023',
    },
    // Add more data as needed
  ];

  constructor(
    private qgenService: QgenService,
    private rsaService: RsaService
  ) {
    // this.dataSource = new MatTableDataSource(this.data);
  }
  ngOnInit() {
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    console.log(this.userId);

    this.getAllHistory();
  }
  getAllHistory() {
    let data = { userId: this.userId };
    this.qgenService.GetHistory(data).subscribe((doc: any) => {
      console.log(doc.result);
      this.qgenList = doc.result;
      this.dataSource = new MatTableDataSource(this.qgenList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
