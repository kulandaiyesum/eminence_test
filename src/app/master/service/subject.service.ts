import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from '../model/subject.class';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  basicURL = environment.localdomain + 'subjects';

  constructor(private http: HttpClient) {}

  saveSubjectMaster = (subject: Subject) => {
    return this.http.post(this.basicURL + '/', subject);
  };

  getAllTopicMaster = () => {
    return this.http.get(this.basicURL + '/');
  };

  updateTopicMaster(subject: Subject) {
    return this.http.put(this.basicURL +'/'+ subject._id, subject);
  }

  deleteTopicMaster(topic: string) {
    return this.http.delete(this.basicURL +'/'+ topic);
  }
}
