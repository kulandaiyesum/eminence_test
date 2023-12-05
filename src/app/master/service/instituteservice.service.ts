import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteserviceService {
  public baseUrl = environment.localdomain + 'institutions';

  constructor(private http: HttpClient) {}
  gettingToken() {
    return localStorage.getItem('1');
  }

  sendVerificationCode(data: { email: string }) {
    return this.http.post(this.baseUrl + 'verifyemail', data);
  }

  createInstitute(data: any) {
    return this.http.post(this.baseUrl + '/', data);
  }

  getAllInstitute(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/');
  }

  updateInstitution(data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/' + data._id, data);
  }

  deleteInstitution(data: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + data._id, {
      body: data,
    });
  }
}
