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
    return this.http.put(this.baseUrl + 'getQuestions', data);
  }
}
