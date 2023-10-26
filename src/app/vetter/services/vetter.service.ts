import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VetterService {
  private baseURL: string = environment.localdomain + 'qgen/';

  constructor(private http: HttpClient) {}

  getVetQuestions(vetterId: string) {
    return this.http.get(this.baseURL + vetterId);
  }
}
