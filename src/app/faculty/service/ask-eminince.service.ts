import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AskEmininceService {
  public baseUrl = environment.localdomain + 'askEminence/';
  public updateUrl = environment.localdomain + 'askEminence/update';
  public deleteUrl = environment.localdomain + 'askEminence/delete';
  public emailUrl = environment.localdomain + 'askEminence/email';

  constructor(private http: HttpClient) {}
  getAskeminice = (askEminence) => {
    return this.http.post(this.baseUrl + 'saveAskEminence', askEminence);
  };

  sampleResponse() {
    return this.http.get('assets/json/askeminence.json');
  }

  askEminenceUpdate(data) {
    return this.http.put(this.updateUrl, data);
  }

  askEminencedelete(data) {
    return this.http.delete(this.deleteUrl, data);
  }
  askEminenceEmail(data) {
    return this.http.post(this.emailUrl, data);
  }
}
