import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectService } from '../../service/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent {
  displayedColumns: string[] = ['subject', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getAllSubject();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getArrayDetails() {
    const sampleData = [
      { subject: 'Maths', status: false },
      { subject: 'Chemistry', status: true },
      { subject: 'Biology', status: false },
      { subject: 'Physics', status: true },
      { subject: 'English', status: false },
      { subject: 'Tamil', status: true },
    ];
    // this.dataSource.data = sampleData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllSubject() {
    this.subjectService.getAllTopicMaster().subscribe(
      (response: any) => {
        // console.log(response.result);
        this.dataSource.data = response.result;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSubject();
      if (result) {
      }
    });
  }

  delete(subject: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this subject?',
      text: "You can't retrieve it again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with the delete operation
        this.deleteSubject(subject._id); // Call your delete HTTP method
      }
    });
  }

  deleteSubject(subjectId: string) {
    console.log(subjectId);
    this.subjectService.deleteTopicMaster(subjectId).subscribe(
      (response) => {
        console.log(response);
        this.getAllSubject();
        Swal.fire('Deleted!', 'The subject has been deleted.', 'success');
      },
      (error) => {
        console.error('Error deleting subject:', error);
      }
    );
  }

  update(subject: any) {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      width: 'auto', // Customize the width
      height: 'auto', // Customize the height
      data: subject,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSubject();
      if (result) {
      }
    });
  }
}
