import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VetterService {
  private baseURL: string = environment.localdomain + 'qgen/';
  private vetHistoryURL: string = environment.localdomain + 'vetterId/status';
  constructor(private http: HttpClient) {}

  getVetQuestions(vetterId: string) {
    return this.http.get(this.baseURL + vetterId);
  }

  getVettedQuestionSet(vetterId: string) {
    const body = { status: 'REVIEWED' };
    const params = new HttpParams().set('vetterId', vetterId);
    return this.http.put(this.vetHistoryURL, body, { params });
  }
}
