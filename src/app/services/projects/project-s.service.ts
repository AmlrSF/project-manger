import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:3000/api/v1/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Project/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(this.baseUrl, projectData);
  }

  updateProject(id: string, projectData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Project/${id}`, projectData);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Project/${id}`);
  }

  deleteAllProjects(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
