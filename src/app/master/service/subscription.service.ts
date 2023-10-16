import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl: string = environment.localdomain + 'subscription';
  private createSubscriptionUrl: string = environment.localdomain + 'subscription/save';
  private createSubscriptionUrlAutoDate: string = environment.localdomain + 'subscription/getDate';
  private updateSubscriptionUrl: string = environment.localdomain + 'subscription/update';
  private deleteSubscriptionUrl: string = environment.localdomain + 'subscription/delete';

  constructor(private http: HttpClient) {}

  getAllSubscriptions() {
    return this.http.get(this.baseUrl + '/getAll');
  }

  createSubscription(data) {
    return this.http.post(`${this.createSubscriptionUrl}`, data,);
  }
  createSubscriptionAuto(data) {
    return this.http.post(`${this.createSubscriptionUrlAutoDate}`, data,);
  }

  updateSubscription(data: any) {
    return this.http.put(this.updateSubscriptionUrl, data);
  }

  deleteSubscription(data: any){
    return this.http.delete(this.deleteSubscriptionUrl, {
      body: data,
    });
  }
}
