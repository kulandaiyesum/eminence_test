import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AskEmininceService {
  public baseUrl = environment.localdomain + 'askEminences/';
  // public updateUrl = environment.localdomain + 'askEminence/update';
  // public deleteUrl = environment.localdomain + 'askEminence/delete';
  public emailUrl = environment.localdomain + 'askEminence/email';

  constructor(private http: HttpClient) {}
  getAskeminice = (askEminence) => {
    console.log(askEminence);
    return this.http.post(this.baseUrl, askEminence);
  };

  sampleResponse() {
    return this.http.get('assets/json/askeminence.json');
  }

  askEminenceUpdate(data) {
    return this.http.put(this.baseUrl + data._id, data);
  }

  askEminencedelete(data) {
    return this.http.delete(this.baseUrl + data._id, data);
  }
  askEminenceEmail(data) {
    return this.http.post(this.emailUrl, data);
  }
}
