import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl = 'http://localhost:3000/api/v1/msg';

  constructor(private http: HttpClient) { }

  getAllMessages(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${projectId}/messages`);
  }

  createMessage(projectId: string, messageData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${projectId}/messages`, messageData);
  }
}
