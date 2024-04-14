import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainsService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api/v1/CMSs';
  public addFCms!: FormGroup;
  public domains: any[] = [];

  constructor(private fb: FormBuilder,private http: HttpClient,
     private domainsS : DomainsService) { }

  ngOnInit(): void {
    this.getDomains();
    this.addFCms = this.fb.group({
      domain: ['', Validators.required],
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getDomains(): void {
    // Assuming you have a service for fetching domains
    this.domainsS.getAllDomains().subscribe(
      (res: any) => {
        console.log(res);

        this.domains = res.data; // Assuming res is an array of domains

        // Filter domains based on domain and status properties
        this.domains = this.domains.filter((domain) => domain.domain && domain.status);
        console.log(this.domains);
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  submitForm(): void {
    if (this.addFCms.valid) {
      
      this.http.post(this.baseUrl, this.addFCms.value).subscribe(
        (res: any) => {
          console.log('Success:', res);
          this.addFCms.reset();
        },
        (err: any) => {
          console.error('Error:', err);
        }
      );
      
    } else {
      // Handle form validation errors
      console.log('fill in the form')

    }
  }
}