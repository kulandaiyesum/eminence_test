import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LiveExamService {
  public baseUrl = environment.localdomain + 'liveExams/';

  constructor(private http: HttpClient) {}

  getQuestionsByTopic() {
    return this.http.get(this.baseUrl + 'questions');
  }
}
