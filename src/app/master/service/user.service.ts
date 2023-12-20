import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
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
    return this.http.patch(this.userUrl + '/' + user._id, user);
  }

  deleteUserMaster(_id: string) {
    return this.http.delete(this.userUrl + '/' + _id);
  }
  getAllVetter(data) {
    return this.http.get(this.userUrl + '/' + data.role);
  }

  checkRegisteredUser(data) {
    return this.http.put(this.userUrl + '/', data);
  }

  /**
   * function to change status of user/institution
   * @param _id
   */
  changeStatus(_id: string, status) {
    if (status == 1) {
      var body = { _id: _id, status: 0 };
    } else {
      var body = { _id: _id, status: 1 };
    }
    return this.http.post(this.userUrl + '/changeStatus', body);
  }

  userComment(data) {
    return this.http.post(this.userUrl + '/comment', data);
  }

  updateUserDetails(data){
    return this.http.patch(this.userUrl+'/'+data._id,data);
  }
}
