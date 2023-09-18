import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleUrl: string = environment.localdomain + 'role';
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('1');
  }

  /**
   * Method to all Roles
   * @returns Role[]
   */
  public getRole() {
    return this.http.get<Role[]>(`${this.roleUrl}/getAll`);
  }
  public saveRole(role: string) {
    const body = { role: role };
    return this.http.post(`${this.roleUrl}/save`, body);
  }

  public editRole(roleObject: any) {
    return this.http.put(`${this.roleUrl}/update`, roleObject);
  }
  public deleteRole(roleId: string) {
    const params = new HttpParams().set('_id', roleId);
    return this.http.delete(`${this.roleUrl}/delete`, {
      params
    });
  }
}
