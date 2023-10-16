import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuerstionService {
  public baseUrl = environment.localdomain + 'v1/questions/';
  constructor(private http: HttpClient) {}
  getAllQuestions(data) {
    return this.http.put(this.baseUrl + 'requests/' + data.reqId, data);
  }
  UpdateOption(reqId, data) {
    return this.http.put(this.baseUrl + reqId, data);
  }

  daleteQuestion(reqId) {
    return this.http.delete(this.baseUrl + reqId);
  }
}
