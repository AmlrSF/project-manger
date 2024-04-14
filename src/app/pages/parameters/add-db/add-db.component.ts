import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db/db.service';
import { DomainsService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-add-db',
  templateUrl: './add-db.component.html',
  styleUrls: ['./add-db.component.css']
})
export class AddDbComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api/v1/domains';
  public addDb !: FormGroup;
  public client: any[] = [];
  public domains: any[] = [];
  private apiUrl = 'http://localhost:3000/api/v1/dbs';
  constructor(private fb: FormBuilder,private dbs : DbService, private domainss: DomainsService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getDomains();
    this.addDb = this.fb.group({
      domain: ['', Validators.required],
      host: ['', Validators.required],
      dbName: ['', Validators.required],
      dbPassword: ['', Validators.required],
      type: ['', Validators.required],
      dbUsername: ['', Validators.required],
    });
  }

  getDomains(): void {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        // console.log(res);

        this.domains = res.data; // Assuming res is an array of domains

        // Filter domains based on domain and status properties
        this.domains = this.domains.filter((domain) => domain.domain && domain.status);
        // console.log(this.domains);

      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }





  submitForm(): void {
    if (this.addDb.valid) {
      this.http.post(this.apiUrl, this.addDb.value).subscribe(
        (res: any) => {
          console.log('Success:', res);
          this.addDb.reset();
        },
        (err: any) => {
          console.error('Error:', err);
        }
      );
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }


}
