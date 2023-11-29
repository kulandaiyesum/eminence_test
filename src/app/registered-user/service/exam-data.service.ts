import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamDataService {
  private examRoomData: any = [];
  private textContent: string = '';
  constructor() {}
  setExamRoomData(examRoomData: any) {
    this.examRoomData = examRoomData;
  }

  getExamRoomData() {
    return this.examRoomData;
  }

  getTextContent(): string {
    return this.textContent;
  }

  setTextContent(content: string): void {
    this.textContent = content;
  }
}
