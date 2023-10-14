import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuerstionService {
  public baseUrl = environment.localdomain + 'question/';
  constructor(private http: HttpClient) {}
  getAllQuestions(data) {
    return this.http.put(this.baseUrl + data.reqId, data);
  }
  UpdateOption(reqId, data) {
    return this.http.put(this.baseUrl + reqId, data);
  }

  daleteQuestion(data) {
    return this.http.delete(this.baseUrl + 'delete', { body: data });
  }
}
