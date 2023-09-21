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

  private getAllPackagesUrl = environment.localdomain + 'package/getAll';
  private createPackageUrl = environment.localdomain + 'package/save';
  private updatePackageUrl = environment.localdomain + 'package/update';
  private deletePackageUrl = environment.localdomain + 'package/delete';

  constructor(private http: HttpClient) {}

  createPackage = (data) => {
    return this.http.post(this.createPackageUrl, data);
  };

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.getAllPackagesUrl}`);
  }

  updatePackage(data: any): Observable<any> {
    return this.http.put(`${this.updatePackageUrl}`, data);
  }

  deletePackage(data: any): Observable<any> {
    return this.http.delete(this.deletePackageUrl, {
      body: data,
    });
  }
}
