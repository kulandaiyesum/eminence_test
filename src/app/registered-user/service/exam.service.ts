import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  public baseUrl = environment.localdomain + 'exams/';

  constructor(private http: HttpClient) {}

  examSubmit(data){
    return this.http.post(this.baseUrl+data.studentId,data)
  }
}
