import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = 'http://localhost:3000/api/v1/dbs';

  constructor(private http: HttpClient) { }

  getAllDBs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  getAllDBsBaseOnDomain(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/db/${id}`);
  }


  getSingleDB(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  postDB(dbData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dbData);
  }

  updateSingleDB(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteSingleDB(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deleteAllDBs(): Observable<any> {
    return this.http.delete<any>(this.apiUrl);
  }
}
