import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Topic } from '../../model/topic';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TopicService } from '../../service/topic.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { MatTableDataSource } from '@angular/material/table';
import { TopicFormComponent } from '../topic-form/topic-form.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  public topic: Topic;
  public TopicList;
  public value = '';
  public myForm: FormGroup;
  public dataSource;
  exampleForm: NgForm;
  public status1;
  public saveButton = true;
  decryptFirstName: string;
  secretKey = environment.secretKey;

  constructor(
    private topicMasterService: TopicService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
  }

  displayedColumns: string[] = ['topic', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.topic = new Topic();
    const storedFirstName = localStorage.getItem('3');
    this.decryptFirstName = this.decryptText(storedFirstName, this.secretKey);
    this.getAllTopicMaster();
  }
  getAllTopicMaster() {
    this.topicMasterService.getAllTopicMaster().subscribe((doc: any) => {
      this.TopicList = doc.result;
      this.dataSource = new MatTableDataSource(doc.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  updateCoreBoxMaster(list) {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      data: list,
    };
    const dialogRef = this.dialog.open(TopicFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllTopicMaster();
    });
  }
  saveCoreBoxMaster() {
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(TopicFormComponent, dialogBoxSettings);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.getAllTopicMaster();
    });
  }
  changeRoleStatus(list) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter = () => {
    this.dataSource.filter = '';
    this.value = '';
  };
  cancel() {
    this.myForm.reset({ status: this.status1 });
    this.topic._id = undefined;
    this.saveButton = true;
  }

  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  deleteCoreBoxMaster(_id: string) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.topicMasterService.deleteTopicMaster(_id).subscribe(
          (result: any) => {
            this.toastr.success(result.message, '', {
              timeOut: 3000,
            });
            this.getAllTopicMaster();
          },
          (err: any) => {
            this.toastr.error(err.message, '', {
              timeOut: 3000,
            });
            this.getAllTopicMaster();
          }
        );
      }
    });
  }
}
