import { VetterService } from './../../services/vetter.service';
import { RsaService } from './../../../shared/service/rsa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-items',
  templateUrl: './open-items.component.html',
  styleUrls: ['./open-items.component.scss'],
})
export class OpenItemsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'date',
    'input',
    'questionsCount',
    'assignedBy',
    // 'subject',
    // 'system',
    // 'subsystem',
    'open',
  ];
  vetterId: string = '';
  secrtkey: string = environment.secretKey;
  constructor(
    private rsaService: RsaService,
    private vetterService: VetterService,
    private toastr: ToastrService
  ) {
    this.vetterId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secrtkey
    );
  }
  ngOnInit(): void {
    this.getVetQuestions(this.vetterId);
  }

  getVetQuestions(vetterId: string) {
    this.vetterService.getVetQuestions(vetterId).subscribe(
      (res: any) => {
        // console.log(res.result);
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
