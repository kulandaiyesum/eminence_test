import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  public baseUrl = environment.localdomain + 'subscriptions';

  constructor(private http: HttpClient) {}

  getAllSubscriptions() {
    return this.http.get(this.baseUrl + '/');
  }

  createSubscription(data) {
    return this.http.post(this.baseUrl + '/', data);
  }

  updateSubscription(data) {
    return this.http.patch(this.baseUrl + '/' + data._id, data);
  }

  deleteSubscription(data) {
    return this.http.delete(this.baseUrl + '/' + data._id);
  }
  //  getDate
  createSubscriptionAuto(data) {
    return this.http.post(this.baseUrl + '/' + data.packageNameId, data);
  }

  checkValidityOfInsititution(check) {
    return this.http.put(this.baseUrl + '/' + check.insititutionId, check);
  }
}
