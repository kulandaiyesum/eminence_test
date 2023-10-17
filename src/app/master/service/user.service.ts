import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.localdomain + 'user/';
  constructor(private http: HttpClient) {}

  getAllUserMaster() {
    return this.http.get(this.userUrl + 'getAll');
  }

  saveUserMaster(user: User) {
    return this.http.post(this.userUrl + 'save', user);
  }

  updateUserMaster(user: User) {
    return this.http.put(this.userUrl + user._id, user);
  }

  deleteUserMaster(_id: string) {
    return this.http.delete(this.userUrl + _id);
  }
}
