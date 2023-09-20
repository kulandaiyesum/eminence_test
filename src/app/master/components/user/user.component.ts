import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'sno',
    'name',
    'email',
    'role',
    'institution',
    'subscription',
    'topic',
    'actions',
  ];
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllUserMaster();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUserMaster() {
    this.userService.getAllUserMaster().subscribe(
      (res: any) => {
        console.log('All users', res.result);
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.log('Error', err);
      }
    );
  }

  saveUserMaster() {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(UserFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('AddRole ', result);
      if (result === undefined) {
        return;
      }
      this.toastr.success(result.message, '', {
        timeOut: 3000,
      });
      this.getAllUserMaster();
    });
  }
  updateUserMaster(user: User) {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
      data: user,
    };
    const dialogRef = this.dialog.open(UserFormComponent, dialogBoxSettings);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result === undefined) {
        return;
      }
      this.toastr.success(result.message, '', {
        timeOut: 3000,
      });
      this.getAllUserMaster();
    });
  }

  deleteUserMaster(user_id: string) {
    console.log(user_id, 'delete');
  }
}
