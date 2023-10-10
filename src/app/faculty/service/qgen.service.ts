import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qgen } from '../model/qgen';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QgenService {
  constructor(private http: HttpClient) {}
  public baseUrl = environment.localdomain + 'qgen/';

  // sampleDomain: string = 'http://localhost:5000/additionalQuestions';

  // public getQgenQuestionData() {
  //   return this.http.get(this.sampleDomain);
  // }

  submitQgen(qgen: Qgen) {
    return this.http.post(this.baseUrl + 'saveQgen', qgen);
  }

  getQGen(userId: string) {
    const body = { userId };
    return this.http.put(this.baseUrl + 'getQenByUserId', body);
  }
}
