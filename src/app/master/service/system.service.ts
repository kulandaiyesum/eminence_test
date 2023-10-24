import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { System } from '../model/system';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private baseURL: string = environment.localdomain + 'system';
  constructor(private http: HttpClient) {}

  saveSystem(sysObj: System) {
    return this.http.post(this.baseURL + '/save', sysObj);
  }

  getAllSystems() {
    return this.http.get(this.baseURL + '/getAll');
  }
}
