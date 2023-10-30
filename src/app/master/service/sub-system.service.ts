import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubSystem } from '../model/sub-system';

@Injectable({
  providedIn: 'root',
})
export class SubSystemService {
  private baseURL: string = environment.localdomain + 'subsystems';
  constructor(private http: HttpClient) {}

  savesubSystem(sysObj: SubSystem) {
    return this.http.post(this.baseURL + '/', sysObj);
  }

  getAllsubSystems() {
    return this.http.get(this.baseURL + '/');
  }

  updatesubSystem(sysObj: SubSystem) {
    return this.http.put(`${this.baseURL}/${sysObj._id}`, sysObj);
  }

  deleteSubSystem(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
