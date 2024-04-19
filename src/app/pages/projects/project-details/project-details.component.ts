import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
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
  
  private baseUrl1 = 'http://localhost:3000/api/v1/invitation';
  public emailForm!: FormGroup;
  private projID: any ="";
  public profile: any;
  messages: any;
newMessageText: any;
  constructor(private http: HttpClient,private chatService:MessagesService, private auth: AuthUserService, private route: ActivatedRoute, projectS: ProjectService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    let projectId = this.route.snapshot.paramMap.get('id');
    
    this.projID = projectId;
    let token = { token: this.auth.getToken() };
    this.http.post<any>(`${this.apiUrl}/profile`, token).subscribe(
      (res: any) => {
        this.profile = res.customer._id;
        
      },
      (err: any) => {
        console.log(err);
      }
    );

    if (projectId) {
      this.http.get(`${this.baseUrl}/Project/${projectId}`).subscribe(
        (res: any) => {
          this.project = res;
          // console.log(this.project);
          
        },
        (error: any) => {
          console.error('Error fetching domain details:', error);
        }
      );

      this.addProject = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });

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

    this.loadMessages();

    this.emailForm = this.fb.group({
      searchEmail: ['']
    });

    this.emailForm.get('searchEmail')?.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.filterEmails(value))
    )
    .subscribe((emails: { email: string, id: string }[]) => {
      this.filteredEmails = emails;
    });

  }

  loadMessages() {
    this.chatService.getAllMessages(this.projID).subscribe(
      (messages: any) => {
        this.messages = messages;
        console.log(messages);
        
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage(messageText: string) {
    const messageData = {
      text: messageText,
      sender: this.profile// Replace with actual current user ID
    };
    this.chatService.createMessage(this.projID, messageData).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        // Reload messages after sending
        this.loadMessages();
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  public submitForm(): void {
    if (this.addProject.valid) {
      const formData = { ...this.addProject.value };
      this.http.put(`${this.baseUrl}/Project/${this.projID}`,formData).subscribe((res:any)=>{
        console.log(res);
        document.getElementById('editUserModal')?.classList.add('hidden');
      },(err:any)=>{
        console.log();
        
      })
      
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
      name: project.title,
      description: project.description
    });
    document.getElementById('editUserModal')?.classList.remove('hidden');
  }

  public deleteProject(project: any) {
    // Add delete project logic here
    this.http.delete(`${this.baseUrl}/Project/${this.projID}`).subscribe((res:any)=>{
      console.log(res);
      this.navigateTo();
    },(err:any)=>{
      console.log(err);
      
    })
  }

  public  formatReadableDate(dateString:any) {

    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  public closeModel() {
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  public navigateTo(id?: any) {
    this.router.navigate(['/admin', id]);
  }
  public submitEmailForm(){
    if (this.emailForm.valid) {
      console.log(this.selectedEmails);
      this.selectedEmails.forEach((email) => {
        this.http.post<any>(this.baseUrl1, {
          project: this.project._id,
          sender: this.project.manager,
          recipient: email.id,
          status: "pending"
        }).subscribe(
          (response: any) => {
            console.log(response);
          },
          (error: any) => {
            console.log(error);
          }
        );
      });
    } else {
      console.log('Form has validation errors');
    }
  }

}
