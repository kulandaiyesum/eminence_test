import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package } from '../model/package.class';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('1')}`);

  private packageBaseUrl = environment.localdomain + 'package';

  constructor(private http: HttpClient) {}

  createPackage(data: any): Observable<any> {
    return this.http.post(`${this.packageBaseUrl}/save`, data);
  }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.packageBaseUrl}/getAll`);
  }

  updatePackage(data: any): Observable<any> {
    return this.http.put(`${this.packageBaseUrl}/update`, data);
  }

  getB2CPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.packageBaseUrl}/getAll?type=B2C`);
  }

  deletePackage(data: any): Observable<any> {
    return this.http.delete(`${this.packageBaseUrl}/delete`, {
      body: data,
    });
  }
}
