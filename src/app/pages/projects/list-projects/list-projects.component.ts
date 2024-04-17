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


  public projects: any[] = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description of Project 1',
      manager: 'John Doe',
      members: ['Alice', 'Bob', 'Charlie'],
      createdDate: new Date('2024-04-20')
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description of Project 2',
      manager: 'Jane Smith',
      members: ['David', 'Emma'],
      createdDate: new Date('2024-04-22')
    },
    {
      id: '3',
      title: 'Project 3',
      description: 'Description of Project 3',
      manager: 'Alex Johnson',
      members: ['Frank', 'Grace', 'Henry'],
      createdDate: new Date('2024-04-25')
    },
    {
      id: '4',
      title: 'Project 4',
      description: 'Description of Project 4',
      manager: 'Sarah Brown',
      members: ['Isaac', 'Julia'],
      createdDate: new Date('2024-04-28')
    },
    {
      id: '5',
      title: 'Project 5',
      description: 'Description of Project 5',
      manager: 'Michael Lee',
      members: ['Karen', 'Liam', 'Olivia'],
      createdDate: new Date('2024-05-01')
    }
  ];
  
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
        this.projects = projects.filter((item:any)=>item.manager != this.profile?._id);
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
    
     this.projectService.deleteProject(project.id).subscribe(
      () => {
        this.getAllProjects();
        console.log('Project deleted:', project);
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }

}
