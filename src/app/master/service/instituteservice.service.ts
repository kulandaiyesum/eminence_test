import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteserviceService {
  public baseUrl = environment.localdomain + 'institutions';
  private baseUserUrl = environment.localdomain + 'user';

  constructor(private http: HttpClient) {}
  gettingToken() {
    return localStorage.getItem('1');
  }

  /**
   * function to change status of user/institution
   * @param _id
   */
  changeStatus(_id: string) {
    const body = { _id };
    return this.http.put(this.baseUrl + '/changeStatus', body);
  }

  sendVerificationCode(data: { email: string }) {
    return this.http.put(this.baseUrl + '/', data);
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
