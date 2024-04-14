import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FtpService {

  private apiUrl = 'http://localhost:3000/api/v1/ftps';

  constructor(private http: HttpClient) { }

  getAllFTPs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAllFTPsBaseOnDomain(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ftp/${id}`);
  }

  getSingleFTP(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  postFTP(ftpData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ftpData);
  }

  updateSingleFTP(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteSingleFTP(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deleteAllFTPs(): Observable<any> {
    return this.http.delete<any>(this.apiUrl);
  }
}
