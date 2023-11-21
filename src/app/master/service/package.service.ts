import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package } from '../model/package.class';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private packageBaseUrl = environment.localdomain + 'packages';

  constructor(private http: HttpClient) {}

  createPackage(data: any): Observable<any> {
    return this.http.post(`${this.packageBaseUrl}/`, data);
  }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.packageBaseUrl}/`);
  }

  updatePackage(data: any): Observable<any> {
    return this.http.put(this.packageBaseUrl + '/' + data._id, data);
  }
  /**
   * this method is provide in register page to show the b2c packages
   * @returns
   */
  getPackagesforRegistration(): Observable<any> {
    const body = {
      type: 'B2C',
    };
    return this.http.put<any>(`${this.packageBaseUrl}/`, body);
  }


  deletePackage(data: any): Observable<any> {
    return this.http.delete(this.packageBaseUrl + '/' + data._id);
  }
}
