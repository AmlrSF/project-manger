import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private baseUrl = 'http://localhost:3000/api/v1/invitation';

  constructor(private http: HttpClient) { }

  getAllInvitations(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createInvitation(invitationData: any): Observable<any> {
    return this.http.post(this.baseUrl, invitationData);
  }

  acceptInvitation(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/accept`, {});
  }

  rejectInvitation(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/reject`, {});
  }
}
