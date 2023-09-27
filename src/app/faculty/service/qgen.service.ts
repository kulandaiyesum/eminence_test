import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QgenService {
  constructor(private http: HttpClient) {}

  sampleDomain: string = 'http://localhost:5000/additionalQuestions';

  public getQgenQuestionData() {
    return this.http.get(this.sampleDomain);
  }
}
