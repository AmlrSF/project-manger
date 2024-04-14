import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  private baseUrl = 'http://localhost:3000/api/v1/CMSs';

  constructor(private http: HttpClient) {}

  getAllCMSs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getAllCMSsbaseOnDomain(id:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cms/${id}`);
  }

  getSingleCMS(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }



  postCMS(cmsData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, cmsData);
  }

  updateSingleCMS(id: string, cmsData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cmsData);
  }

  deleteSingleCMS(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  deleteAllCMSs(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}`);
  }
}
