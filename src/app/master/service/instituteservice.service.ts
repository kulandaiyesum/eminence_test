import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteserviceService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);
  getAllInstituteURL = environment.localdomain + 'institution/getAll';
  createInstituteURL = environment.localdomain + 'institution/save';
  updateInstituteURL = environment.localdomain + 'institution/';
  deleteInstituteURL = environment.localdomain + 'institution/';

  constructor(private http: HttpClient) {}
  gettingToken() {
    return localStorage.getItem('1');
  }

  createInstitute(data: any) {
    return this.http.post(`${this.createInstituteURL}`, data,);
  }

  getAllInstitute(): Observable<any[]> {
    return this.http.get<any[]>(this.getAllInstituteURL,);
  }

  updateInstitution(data: any): Observable<any> {
    return this.http.put(this.updateInstituteURL+data._id, data,);
  }

  deleteInstitution(data: any): Observable<any> {
    return this.http.delete(this.deleteInstituteURL+data._id, {
      body: data,
    });
  }
}
