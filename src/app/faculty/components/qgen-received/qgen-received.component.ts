import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { QgenService } from '../../service/qgen.service';

@Component({
  selector: 'app-qgen-received',
  templateUrl: './qgen-received.component.html',
  styleUrls: ['./qgen-received.component.scss'],
})
export class QgenReceivedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'input', 'questionsCount', 'open'];
  userId: string = '';
  secrtkey: string = environment.secretKey;
  questionSet: any[];
  constructor(
    private rsaService: RsaService,
    private qgenService: QgenService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secrtkey
    );
    this.getRecivedQuestionSet();
  }

  getRecivedQuestionSet() {
    this.qgenService.getQGen(this.userId).subscribe(
      (res: any) => {
        const tempHolder = res.result;
        this.questionSet = tempHolder.filter(
          (pendingItem) => pendingItem.status === 'RECEIVED'
        );
        this.dataSource = new MatTableDataSource(this.questionSet);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
