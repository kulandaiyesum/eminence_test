import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sendcode } from '../model/sendcode.class';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  public baseUrl = environment.localdomain + 'exams/';

  constructor(private http: HttpClient) {}

  examSubmit(data) {
    return this.http.post(this.baseUrl + data.studentId, data);
  }

  examTimedSubmit(examTimedObject) {
    return this.http.post(
      this.baseUrl + examTimedObject.studentId,
      examTimedObject
    );
  }

  getExamDetailsByStudentId(id: string) {
    return this.http.get(this.baseUrl + id);
  }

  getQuestionByExamId(data) {
    return this.http.put(this.baseUrl + data._id, data);
  }

  generateCode(): string {
    // Customize this method to generate your unique code
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `A${randomCode}`;
  }

  getRandomCode() {
    return this.http.get(this.baseUrl);
  }

  sendExamCode(sendCodeObject: Sendcode) {
    return this.http.post(this.baseUrl, sendCodeObject);
  }
}
