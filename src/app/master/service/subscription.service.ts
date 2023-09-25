import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl: string = environment.localdomain + 'subscription';

  constructor(private http: HttpClient) {}

  getAllSubscriptions() {
    return this.http.get(this.baseUrl + '/getAll');
  }
}
