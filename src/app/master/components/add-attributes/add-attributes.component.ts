import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddElementComponent } from '../add-element/add-element.component';
import { Qgen } from 'src/app/faculty/model/qgen';
import { QgenService } from 'src/app/faculty/service/qgen.service';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { AddVetterComponent } from '../add-vetter/add-vetter.component';

@Component({
  selector: 'app-add-attributes',
  templateUrl: './add-attributes.component.html',
  styleUrls: ['./add-attributes.component.scss'],
  providers: [DatePipe],
})
export class AddAttributesComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'date',
    'input',
    'question',
    'element',
    'vetter',
    'action',
  ];
  userId: string = '';
  qgenObjectList: Qgen[];
  secretKey: string = environment.secretKey;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private qGenService: QgenService,
    private rsaService: RsaService,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.getQuestionsList();
    // this.openAddDialog("shek");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQuestionsList() {
    this.qGenService.getQGen(this.userId).subscribe(
      (res: any) => {
        const filteredResult = res.result.filter(
          (item: any) => item.status === 'RECEIVED'
        );
        const tempHolder = res.result;
        // filteredResult.forEach((item: any) => {
        //   item.createdAt = this.formatDate(item.createdAt);
        // });
        this.qgenObjectList = filteredResult;
        this.dataSource.data = this.qgenObjectList;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // Reset sort to its initial state
    this.dataSource.sort?.sort({ id: '', start: 'asc', disableClear: false });
  }

  openAddDialog(rowDetails: any): void {
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: rowDetails, // Pass row details as a parameter
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getQuestionsList();
      if (result) {
        // Handle any actions after the dialog is closed
      }
    });
  }
  openAddDialog1(row) {
    const dialogRef = this.dialog.open(AddVetterComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: row, // Pass row details as a parameter
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getQuestionsList();
      if (result) {
        // Handle any actions after the dialog is closed
      }
    });
  }

  openAddDialogForUpdateVetter(row) {
    const dialogRef = this.dialog.open(AddVetterComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: row, // Pass row details as a parameter
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getQuestionsList();
      if (result) {
        // Handle any actions after the dialog is closed
      }
    });
  }

  updateAttributes(row) {
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: row, // Pass row details as a parameter
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getQuestionsList();
      if (result) {
        // Handle any actions after the dialog is closed
      }
    });
  }

  confirmDelete(data: any) {
    Swal.fire({
      title: 'Are you sure want to delete it?',
      text: "You can't retrieve it again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete method here
        this.deleteItem(data);
      }
    });
  }
  deleteItem(data: any) {
    this.qGenService.deleteAttributes(data).subscribe(
      (response: any) => {
        console.log();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
