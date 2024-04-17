import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProjectService } from 'src/app/services/projects/project-s.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  
  public project:any= {
    id: '2',
    title: 'Project 2',
    description: 'Description of Project 2',
    manager: 'Jane Smith',
    members: ['David', 'Emma'],
    createdDate: new Date('2024-04-22')
  }
  private baseUrl = 'http://localhost:3000/api/v1/projects';

  public constructor(private http : HttpClient,private auth:AuthUserService,private route: ActivatedRoute, projectS:ProjectService){}

  ngOnInit(): void {
    
    const projectId = this.route.snapshot.paramMap.get('id');

    
    if (projectId) {
      
      this.http.get(`${this.baseUrl}/Project/${projectId}`).subscribe(

        (res: any) => {
          console.log(res);
          
          this.project = res.data;
          console.log(this.project);
          
        },
        (error: any) => {
          console.error('Error fetching domain details:', error);
        }

      );
    } else {
      console.error('domain ID not found in route parameters.');
    }
  }


}
