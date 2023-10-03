import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AskEmininceService {
  public baseUrl = environment.localdomain + 'askEminence/';

  constructor(private http: HttpClient) {}
  getAskeminice = (askEminence) => {
    return this.http.post(this.baseUrl + 'saveAskEminence', askEminence);
  };
}
