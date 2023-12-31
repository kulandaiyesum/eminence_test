import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  loginURL = environment.localdomain + 'topic/';
  constructor(private http: HttpClient) {}

  getAllTopicMaster = () => {
    return this.http.get(this.loginURL + 'getAll');
  };
  saveTopicMaster = (topic: Topic) => {
    return this.http.post(this.loginURL + 'save', topic);
  };

  updateTopicMaster(topic: Topic) {
    return this.http.put(this.loginURL + 'update', topic);
  }

  deleteTopicMaster(topic_id: string) {
    const params = new HttpParams().set('_id', topic_id);
    return this.http.delete(this.loginURL + 'delete', {
      params,
    });
  }
}
