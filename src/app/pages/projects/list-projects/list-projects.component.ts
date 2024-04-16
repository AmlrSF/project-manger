import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProjectService } from 'src/app/services/projects/project-s.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {


  public projects: any[] = [];
  public profile:any;
  private apiUrl: string = "http://localhost:3000/api/v1/customers";

  constructor(private http:HttpClient,private projectService: ProjectService,private auth:AuthUserService) { }

  ngOnInit(): void {
    
    let token = { token: this.auth.getToken() };
    this.http.post<any>(`${this.apiUrl}/profile`, token).subscribe(
      (res: any) => {
        this.profile = res.customer;
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.getAllProjects();

  }

  getAllProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: any) => {
        this.projects = projects.filter((item:any)=>item.manager != this.profile._id);
        console.log(this.projects)
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  editproject(project: any) {
    
  }
  deleteProject(project: any) {
    
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }

}
