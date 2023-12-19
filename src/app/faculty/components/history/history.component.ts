import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QgenService } from '../../service/qgen.service';
import { environment } from 'src/environments/environment';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private qgenService: QgenService,
    private rsaService: RsaService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.getAllHistory();
  }
  getAllHistory() {
    this.qgenService.GetHistory(this.userId).subscribe((doc: any) => {
      this.qgenList = doc.result;
      var arr3 = this.qgenList.sort(
        (a, b) =>
          new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
      );
      this.dataSource = new MatTableDataSource(this.qgenList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getPdf(row) {
    this.qgenService.getPdf(row).subscribe(
      (doc: any) => {
        this.toastr.success(doc.message, '', {
          timeOut: 3000,
        });
        this.getAllHistory();
        // let file;
        // file = new Blob([doc], { type: 'application/pdf' });
        // saveAs(file, row.keywords + '');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
