import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}
