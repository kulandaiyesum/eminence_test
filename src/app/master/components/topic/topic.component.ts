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
    // this.myForm = new FormGroup({
    //   topic: new FormControl('', [Validators.required]),
    // });
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
      console.log(doc);
      this.TopicList = doc.result;
      this.dataSource = new MatTableDataSource(doc.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  updateCoreBoxMaster(list) {
    const dialogRef = this.dialog.open(TopicFormComponent, {
      data: list,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('editRqole ', result);
      if (result === undefined) {
        return;
      }
      this.toastr.success(result.message, '', {
        timeOut: 3000,
      });
      this.getAllTopicMaster();
    });
    // this.topic._id = list._id;
    // this.topic.topic = list.topic;
    // this.topic.status = list.status;
    // this.saveButton = true;
  }
  saveCoreBoxMaster() {
    const dialogRef = this.dialog.open(TopicFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('AddRole ', result);
      if (result === undefined) {
        return;
      }
      this.toastr.success(result.message, '', {
        timeOut: 3000,
      });

      this.getAllTopicMaster();
    });

    // this.saveButton = false;
    // if (this.topic._id === undefined) {
    //   this.topic.createdOn = this.decryptFirstName;
    //   this.topicMasterService.saveTopicMaster(this.topic).subscribe(
    //     (data: any) => {
    //       this.getAllTopicMaster();
    //       console.log('data', data);
    //       this.myForm.reset({ status: this.status1 });
    //       this.toastr.success(data.message, '', {
    //         timeOut: 3000,
    //       });
    //       this.saveButton = true;
    //     },
    //     (err) => {
    //       this.saveButton = true;
    //       this.toastr.error(err.message, '', {
    //         timeOut: 3000,
    //       });
    //       // this.notifier.notify('error', err.error.message);
    //     }
    //   );
    // } else {
    //   this.topicMasterService.updateTopicMaster(this.topic).subscribe(
    //     (data: any) => {
    //       this.toastr.success(data.message, '', {
    //         timeOut: 3000,
    //       });
    //       // this.notifier.notify('success', data.message);
    //       this.getAllTopicMaster();
    //       this.myForm.reset({ status: this.status1 });
    //       this.topic._id = undefined;
    //       this.saveButton = true;
    //     },
    //     (err) => {
    //       this.saveButton = true;
    //       this.toastr.error(err.error.message, '', {
    //         timeOut: 3000,
    //       });
    //       // this.notifier.notify('error', err.error.message);
    //     }
    //   );
    // }
  }
  changeRoleStatus(list) {}

  clearFilter = () => {
    this.dataSource.filter = '';
    this.value = '';
  };
  deleteCoreBoxMaster(list) {}
  cancel() {
    this.myForm.reset({ status: this.status1 });
    this.topic._id = undefined;
    this.saveButton = true;
  }

  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
