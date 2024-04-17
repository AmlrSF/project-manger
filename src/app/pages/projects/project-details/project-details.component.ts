import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProjectService } from 'src/app/services/projects/project-s.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public project: any;

  public addProject!: FormGroup;
  public selectedEmails: { email: string, id: string }[] = [];
  public emails: { email: string, id: string }[] = []; 
  public filteredEmails: { email: string, id: string }[] = []; 

  private baseUrl = 'http://localhost:3000/api/v1/projects';
  private apiUrl: string = "http://localhost:3000/api/v1/customers";
  public emailForm!: FormGroup;

  constructor(private http: HttpClient, private auth: AuthUserService, private route: ActivatedRoute, projectS: ProjectService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId) {
      this.http.get(`${this.baseUrl}/Project/${projectId}`).subscribe(
        (res: any) => {
          this.project = res;
        },
        (error: any) => {
          console.error('Error fetching domain details:', error);
        }
      );

      this.http.get<any>(this.apiUrl).subscribe(
        (res: any) => {
          this.emails = res.customers.map((item: any) => ({ email: item.email, id: item._id }));
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.error('domain ID not found in route parameters.');
    }

    this.emailForm = this.fb.group({
      searchEmail: ['']
    });
  }

  public submitForm(): void {
    if (this.addProject.valid) {
      const formData = { ...this.addProject.value };
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  filterEmails(value: string): Observable<{ email: string, id: string }[]> {
    return of(this.emails.filter(email => email.email.toLowerCase().startsWith(value.toLowerCase())));
  }

  public getSelectedEmail(value: { email: string, id: string }) {
    this.filteredEmails = this.filteredEmails.filter(email => email.email !== value.email);
    this.selectedEmails.push(value);
  }

  public deselectEmail(email: { email: string, id: string }) {
    this.selectedEmails = this.selectedEmails.filter(selectedEmail => selectedEmail.email !== email.email);
    this.filteredEmails.push(email);
  }

  public editProject(project: any) {
    console.log(project);
    
    this.addProject.patchValue({
      title: project.title,
      description: project.description
    });
    document.getElementById('editUserModal')?.classList.remove('hidden');
  }

  public deleteProject(project: any) {
    // Add delete project logic here
  }

  public closeModel() {
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  public navigateTo(id: any) {
    this.router.navigate(['/admin/clients/client', id]);
  }
}
