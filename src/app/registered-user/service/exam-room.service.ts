import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamRoomService {
  private baseUrl: string = environment.localdomain;
  constructor(private http: HttpClient) {}

  joinExam(jionLink: string) {
    return this.http.post(this.baseUrl, { jionLink });
  }
}
