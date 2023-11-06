import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qbank } from 'src/app/registered-user/model/qbank';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuerstionService {
  public baseUrl = environment.localdomain + 'questions/';
  public updateQuestionStatus = environment.localdomain;
  constructor(private http: HttpClient) {}
  getAllQuestions(data) {
    return this.http.put(this.baseUrl + 'requests/' + data.reqId, data);
  }
  UpdateOption(reqId, data) {
    return this.http.put(this.baseUrl + reqId, data);
  }

  daleteQuestion(reqId) {
    return this.http.delete(this.baseUrl + reqId._id, reqId);
  }

  updateStatusOfQuestion(data) {
    return this.http.put(this.baseUrl + data.questionId + '/status', data);
  }

  /**
   * method to POST request for students to build request
   * @param qbank
   * @returns
   */
  postQbankRequest(qbank: Qbank) {
    return this.http.put(this.updateQuestionStatus+ 'exams/', qbank);
  }
}
