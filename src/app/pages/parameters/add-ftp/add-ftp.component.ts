import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainsService } from 'src/app/services/domain/domain.service';
import { FtpService } from 'src/app/services/ftp/ftp.service';

@Component({
  selector: 'app-add-ftp',
  templateUrl: './add-ftp.component.html',
  styleUrls: ['./add-ftp.component.css']
})
export class AddFtpComponent  implements OnInit {
  private baseUrl = 'http://localhost:3000/api/v1/ftps';
  public addFtp!: FormGroup;
  public domains: any[] = [];

  constructor(private fb: FormBuilder,private http: HttpClient, private domainsS : DomainsService,private ftpService: FtpService) { }

  ngOnInit(): void {
    this.getDomains();
    this.addFtp = this.fb.group({
      domain: ['', Validators.required],
      type: ['', Validators.required],
      host: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      port: ['', Validators.required],
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
    if (this.addFtp.valid) {
      console.log(this.addFtp.value);
      
      this.http.post(this.baseUrl, this.addFtp.value).subscribe(
        (res: any) => {
          console.log('Success:', res);

          this.addFtp.reset();
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