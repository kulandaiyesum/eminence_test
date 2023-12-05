import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrivateExamService {
  public baseUrl = environment.localdomain + 'privateExams';

  constructor(private http: HttpClient) {}

  savePrivateExam(data) {
    return this.http.post(this.baseUrl + '/', data);
  }

  joinExam(data) {
    return this.http.put(this.baseUrl + '/', data);
  }

  updateChat(data) {
    return this.http.put(this.baseUrl + '/message', data);
  }
  getByRoomCode(data) {
    return this.http.put(this.baseUrl + '/chats', data);
  }
  getLandingPage(data) {
    return this.http.put(this.baseUrl + '/users', data);
  }

  getHostExamHistory(email) {
    return this.http.put(this.baseUrl + '/histroy/' + email, email);
  }
}
