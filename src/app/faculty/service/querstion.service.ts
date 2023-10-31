import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuerstionService {
  public baseUrl = environment.localdomain + 'questions/';
  public updateQuestionStatus=environment.localdomain
  constructor(private http: HttpClient) {}
  getAllQuestions(data) {
    return this.http.put(this.baseUrl + 'requests/' + data.reqId, data);
  }
  UpdateOption(reqId, data) {
    return this.http.put(this.baseUrl + reqId, data);
  }

  daleteQuestion(reqId) {
    return this.http.delete(this.baseUrl + reqId._id, reqId);
  }

  updateStatusOfQuestion(id:string){
    console.log(id);
    return this.http.put(this.baseUrl+id+"/status",id)
  }
}
