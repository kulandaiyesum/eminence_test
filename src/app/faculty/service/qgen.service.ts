import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qgen } from '../model/qgen';
import { environment } from 'src/environments/environment.development';
import { Attributes } from 'src/app/master/model/attributes.class';

@Injectable({
  providedIn: 'root',
})
export class QgenService {
  constructor(private http: HttpClient) {}
  public baseUrl = environment.localdomain + 'requests/';

  submitQgen(qgen: Qgen) {
    return this.http.post(this.baseUrl, qgen);
  }

  getQGen(userId: string) {
    return this.http.get(this.baseUrl + 'users/' + userId);
  }

  getQgenwithInstitution(InstitutionId: string) {
    return this.http.get(this.baseUrl + 'institute/' + InstitutionId);
  }

  GetHistory(userId) {
    return this.http.get(this.baseUrl + userId + '/status');
  }
  getPdf(data) {
    return this.http.post(this.baseUrl + data, data);
  }

  reviewQuestionSet(data) {
    return this.http.patch(this.baseUrl + data.reqId + '/status', data);
  }

  addAttributes(attributes: Attributes) {
    return this.http.patch(this.baseUrl + attributes.qgenid, attributes);
  }
  deleteAttributes(attributes) {
    return this.http.delete(this.baseUrl + attributes._id);
  }

  checkValidityOfInsititution(check) {
    return this.http.put(this.baseUrl + check.userID, check);
  }
  getVettedQuestionSet(vetterId) {
    return this.http.put(this.baseUrl + vetterId._id + '/status', vetterId);
  }
}
