import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { System } from '../model/system';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private baseURL: string = environment.localdomain + 'systems';
  constructor(private http: HttpClient) {}

  saveSystem(sysObj: System) {
    return this.http.post(this.baseURL + '/', sysObj);
  }

  getAllSystems() {
    return this.http.get(this.baseURL + '/');
  }

  updateSystem(sysObj:System) {
    return this.http.put(`${this.baseURL}/${sysObj._id}`, sysObj);
  }

  deleteSyatem(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
