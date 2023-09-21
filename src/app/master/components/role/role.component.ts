import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<Role>;
  displayedColumns: string[] = ['sno', 'role', 'actions']; // 'status'
  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getRole();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRole() {
    this.roleService.getRole().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  addRole() {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(RoleFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getRole();
    });
  }
  editRole(roleObject: any): void {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      data: roleObject,
    };
    const dialogRef = this.dialog.open(RoleFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getRole();
    });
  }
  deleteRole(role: any) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(role._id).subscribe(
          (result: any) => {
            this.toastr.success(result.message, '', {
              timeOut: 3000,
            });
            this.getRole();
          },
          (err: any) => {
            this.toastr.error(err.message, '', {
              timeOut: 3000,
            });
            this.getRole();
          }
        );
      }
    });
  }
}
