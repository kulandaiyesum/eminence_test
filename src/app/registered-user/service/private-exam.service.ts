import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrivateExamService {
  public baseUrl = environment.localdomain + 'privateExams';

  constructor(private http: HttpClient) {}

  savePrivateExam(data) {
    return this.http.post(this.baseUrl + '/', data);
  }

  joinExam(data) {
    return this.http.put(this.baseUrl + '/', data);
  }
}
