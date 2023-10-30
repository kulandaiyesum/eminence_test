import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SystemCrudComponent } from '../system-crud/system-crud.component';
import { SystemService } from '../../service/system.service';
import { System } from '../../model/system';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<System>;
  displayedColumns: string[] = ['sno', 'system', 'actions'];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private systemServeice: SystemService
  ) {}
  ngOnInit(): void {
    this.getAllSystem();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllSystem() {
    this.systemServeice.getAllSystems().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  addSystem() {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(SystemCrudComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllSystem();
    });
  }

  editSystem(sysObj: System) {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      data: sysObj,
    };
    const dialogRef = this.dialog.open(SystemCrudComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllSystem();
    });
  }
  deleteSystem(_id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this system?',
      text: "You can't retrieve it again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed',
    }).then((result) => {
      if (result.isConfirmed) {
        this.systemServeice.deleteSystem(_id).subscribe(
          (res: any) => {
            Swal.fire('Deleted!', 'The system has been deleted.', 'success');
            this.getAllSystem();
          },
          (err: any) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      }
    });
  }
}
