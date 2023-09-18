import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../model/role';
import { RoleService } from '../../services/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss'],
})
export class RoleTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<Role>;
  displayedColumns: string[] = [
    'sno',
    'role',
    // 'status',
    'actions',
  ];
  constructor(private roleService: RoleService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getRole();
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
      this.getRole();
    });
    
  }
  editRole(roleObject: any): void {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: roleObject,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
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
