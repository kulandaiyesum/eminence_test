import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamDataService {
  private examRoomData: any = [];
  constructor() {}
  setExamRoomData(examRoomData: any) {
    this.examRoomData = examRoomData;
  }

  getExamRoomData() {
    return this.examRoomData;
  }
}
