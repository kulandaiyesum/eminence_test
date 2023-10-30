import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SubSystem } from '../../model/sub-system';
import { SubSystemService } from '../../service/sub-system.service';
import { SubSystemCrudComponent } from '../sub-system-crud/sub-system-crud.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-system',
  templateUrl: './sub-system.component.html',
  styleUrls: ['./sub-system.component.scss'],
})
export class SubSystemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<SubSystem>;
  displayedColumns: string[] = ['sno', 'systemId', 'subSystem', 'actions'];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private subSystemServeice: SubSystemService
  ) {}
  ngOnInit(): void {
    this.getAllsubSystems();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllsubSystems() {
    this.subSystemServeice.getAllsubSystems().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.result);
        console.log(data.result);
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
  addsubSystem() {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(
      SubSystemCrudComponent,
      dialogBoxSettings
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllsubSystems();
    });
  }
  editsubSystem(subSysObj: SubSystem) {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      data: subSysObj,
    };
    const dialogRef = this.dialog.open(
      SubSystemCrudComponent,
      dialogBoxSettings
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllsubSystems();
    });
  }
  deletesubSystem(_id: string) {
    Swal.fire({
      title: 'Delete Subsystem',
      text: 'Are you sure you want to delete this subsystem? You cannot retrieve it again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed',
    }).then((result) => {
      if (result.isConfirmed) {
        this.performSubSystemDeletion(_id);
      }
    });
  }

  performSubSystemDeletion(_id: string) {
    this.subSystemServeice.deleteSubSystem(_id).subscribe(
      (res: any) => {
        Swal.fire('Deleted!', 'The subsystem has been deleted.', 'success');
        this.getAllsubSystems();
      },
      (err: any) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

}
