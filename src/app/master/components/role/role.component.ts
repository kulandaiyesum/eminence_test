import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  constructor(private roleService: RoleService, private dialog: MatDialog) {}
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
        console.log(response);
        this.dataSource = new MatTableDataSource(response.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  addRole() {
    const dialogRef = this.dialog.open(RoleFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('AddRole ', result);
      if (result === undefined) {
        return;
      }
      this.getRole();
    });
  }
  editRole(roleObject: any): void {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: roleObject,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result === undefined) {
        return;
      }
      this.getRole();
    });
  }
  deleteRole(role: any) {
    console.log(role, 'delete method called');
    this.roleService.deleteRole(role._id).subscribe(
      (result) => {
        console.log(result, 'returned value');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
