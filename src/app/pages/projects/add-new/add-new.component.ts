import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  public addProject!: FormGroup;
  public emailForm!:FormGroup;
  public Emails: { email: string, id: string }[] = []; // Array of objects with email and id properties
  public filteredEmails: { email: string, id: string }[] = []; // Array of objects with email and id properties
  private id: string = '';
  private apiUrl: string = "http://localhost:3000/api/v1/customers";
  private baseUrl = 'http://localhost:3000/api/v1/projects';
  private baseUrl1 = 'http://localhost:3000/api/v1/invitation';
  public SelectedEmails: { email: string, id: string }[] = [];

  private profileSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private auth: AuthUserService) { }

  ngOnInit() {
    this.http.get<any>(this.apiUrl).subscribe(
      (res: any) => {
        // Populate the Emails array with objects containing email and id properties
        this.Emails = res.customers.map((item: any) => ({ email: item.email, id: item._id }));
        console.log(this.Emails);
      },
      (err: any) => {
        console.log(err);
      }
    );

    // Fetch the user ID from the server
    let token = { token: this.auth.getToken() };
    this.profileSubscription = this.http.post<any>(`${this.apiUrl}/profile`, token).subscribe(
      (res: any) => {
        this.id = res.customer._id;
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.addProject = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      searchEmail: ['']
    });

    this.addProject.get('searchEmail')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: string) => this.filterEmails(value))
      )
      .subscribe((emails: { email: string, id: string }[]) => {
        this.filteredEmails = emails;
      });
  }

  filterEmails(value: string): Observable<{ email: string, id: string }[]> {
    return of(this.Emails.filter(email => email.email.toLowerCase().startsWith(value.toLowerCase())));
  }

  submitForm() {
    if (this.addProject.valid) {
      let projectObj = {
        title: this.addProject.value.name,
        description: this.addProject.value.description,
        manager: this.id
      }

      this.http.post<any>(this.baseUrl, projectObj).subscribe(
        (res: any) => {
          console.log(res);
          this.SelectedEmails.forEach((email) => {
            this.http.post<any>(this.baseUrl1, {
              project: res._id,
              sender: this.id,
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
          this.addProject.reset();
        },
        
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form has validation errors');
    }
  }

 
  public getSelectedEmail(value: { email: string, id: string }) {
    this.filteredEmails = this.filteredEmails.filter(email => email.email !== value.email);
    this.SelectedEmails.push(value);
  }

  public diselectEmail(email: { email: string, id: string }) {
    this.SelectedEmails = this.SelectedEmails.filter(selectedEmail => selectedEmail.email !== email.email);
    this.filteredEmails.push(email);
  }

  ngOnDestroy() {
    // Unsubscribe from the profileSubscription to avoid memory leaks
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }




}
