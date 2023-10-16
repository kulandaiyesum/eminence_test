import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qgen } from '../model/qgen';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QgenService {
  constructor(private http: HttpClient) {}
  public baseUrl = environment.localdomain + 'v1/requests/';

  // sampleDomain: string = 'http://localhost:5000/additionalQuestions';

  // public getQgenQuestionData() {
  //   return this.http.get(this.sampleDomain);
  // }

  submitQgen(qgen: Qgen) {
    return this.http.post(this.baseUrl, qgen);
  }

  getQGen(userId: string) {
    return this.http.get(this.baseUrl + 'users/' + userId);
  }
}
