import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.localdomain + 'users';
  constructor(private http: HttpClient) {}

  getAllUserMaster() {
    return this.http.get(this.userUrl + '/');
  }

  saveUserMaster(user: User) {
    return this.http.post(this.userUrl + '/', user);
  }

  updateUserMaster(user: User) {
    return this.http.put(this.userUrl + '/'+user._id, user);
  }

  deleteUserMaster(_id: string) {
    return this.http.delete(this.userUrl +'/'+ _id);
  }
  getAllVetter(data) {
    return this.http.get(this.userUrl + '/'+data.role);
  }
}
