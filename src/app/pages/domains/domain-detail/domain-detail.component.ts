import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomainsService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-domain-detail',
  templateUrl: './domain-detail.component.html',
  styleUrls: ['./domain-detail.component.css']
})
export class DomainDetailComponent  implements OnInit {

  public domain: any;
  private baseUrl = 'http://localhost:3000/api/v1/domains'; // Replace with your actual API base URL

  constructor(private domainS : DomainsService,  private route: ActivatedRoute, private http : HttpClient) {}

  ngOnInit(): void {

    // Get the domain ID from the route parameters
    const domainId = this.route.snapshot.paramMap.get('id');

    // Check if domainId is available
    if (domainId) {
      // Call the service to get domain details by ID
      this.http.get(`${this.baseUrl}/Domain/${domainId}`).subscribe(

        (res: any) => {
          console.log(res);
          
          this.domain = res.data; // Assign domain details to the component property
          console.log(this.domain);
          
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
