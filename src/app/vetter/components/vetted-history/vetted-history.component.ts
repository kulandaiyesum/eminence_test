import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { VetterService } from '../../services/vetter.service';
import { environment } from 'src/environments/environment';
import { QgenService } from 'src/app/faculty/service/qgen.service';

@Component({
  selector: 'app-vetted-history',
  templateUrl: './vetted-history.component.html',
  styleUrls: ['./vetted-history.component.scss'],
})
export class VettedHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'date',
    'input',
    'subject',
    'system',
    'subsystem',
    'questionsCount',
  ];
  vetterId: string = '';
  secrtkey: string = environment.secretKey;
  questionSet: any[];
  constructor(
    private rsaService: RsaService,
    private vetterService: VetterService,
    private qgenService: QgenService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.vetterId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secrtkey
    );
    this.getVettedQuestionSet();
  }

  getVettedQuestionSet() {
    let data = { _id: this.vetterId, status: 'V REVIEWED' };
    this.qgenService.getVettedQuestionSet(data).subscribe(
      (res: any) => {
        this.questionSet = res.result;
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
}
