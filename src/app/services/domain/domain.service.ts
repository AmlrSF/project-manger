// domains.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  private baseUrl = 'http://localhost:3000/api/v1/domains'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllDomains(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getDomainById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Domain/${id}`);
  }

  addDomain(domainData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, domainData);
  }

  updateDomain(id: string, domainData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Domain/${id}`, domainData);
  }

  deleteDomain(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Domain/${id}`);
  }
}
