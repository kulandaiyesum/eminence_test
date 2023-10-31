import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Qbank } from '../model/qbank';

@Injectable({
  providedIn: 'root',
})
export class QbankService {
  private baseUrl: string = environment.localdomain + 'questions';
  constructor(private http: HttpClient) {}

  postQbankRequest(qbank: Qbank) {
    return this.http.post(this.baseUrl + qbank.userId + '/questions', qbank);
  }
}
