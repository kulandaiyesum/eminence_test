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
import Swal from 'sweetalert2';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public userList;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'institution',
    'sno',
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
        this.userList = res.result;
        this.dataSource = new MatTableDataSource(res.result);
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

  saveUserMaster() {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
      overflow: 'auto',
    };
    const dialogRef = this.dialog.open(UserFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllUserMaster();
    });
  }
  updateUserMaster(user: User) {
    let dialogBoxSettings = {
      width: '600px',
      margin: '0 auto',
      data: user,
      overflow: 'auto',
    };
    const dialogRef = this.dialog.open(UserFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllUserMaster();
    });
  }

  deleteUserMaster(user_id: string) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserMaster(user_id).subscribe(
          (result: any) => {
            this.toastr.success(result.message, '', {
              timeOut: 3000,
            });
            this.getAllUserMaster();
          },
          (err: any) => {
            this.toastr.error(err.error.message, '', {
              timeOut: 3000,
            });
            this.getAllUserMaster();
          }
        );
      }
    });
  }

  addSubscription(data) {
    const dialogOptions = {
      width: '600px',
      margin: '0 auto',
      data: { data: data, from: 'vetter' },
    };
    const dialogRef = this.dialog.open(AddSubscriptionComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUserMaster();
    });
  }

  /**
   * function to change the status of user/institute
   * @param elementId
   */
  changeStatus(elementId: string, status) {
    Swal.fire({
      title: 'Do you want to chnage status of the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(elementId, status);

        this.userService.changeStatus(elementId, status).subscribe(
          (response: any) => {
            this.toastr.success(response.message, 'Status changed', {
              timeOut: 3000,
            });
            this.getAllUserMaster();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Status changed', {
              timeOut: 3000,
            });
            this.getAllUserMaster();
            console.error('Delete failed', error);
          }
        );
      } else {
        this.getAllUserMaster();
      }
    });
  }
}
