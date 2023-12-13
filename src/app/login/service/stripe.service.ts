import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  public baseUrl = environment.localdomain + 'stripes';

  constructor(private http: HttpClient) {}

  makePayment(stocken: any) {
    return this.http.post(this.baseUrl + '/checkOut', { token: stocken });
  }
}
