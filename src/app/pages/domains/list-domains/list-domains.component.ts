import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { DomainsService } from 'src/app/services/domain/domain.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-domains',
  templateUrl: './list-domains.component.html',
  styleUrls: ['./list-domains.component.css']
})

export class ListDomainsComponent implements OnInit {


  private baseUrl = 'http://localhost:3000/api/v1/domains';
  public addDomain !: FormGroup;
  private id: string = "";
  public domains: any[] = [];
  public filtereddomains: any[] = [];
  constructor(
    private clientS: ClientsService,
    private domainS: DomainsService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // interval(5000).subscribe(() => {
    //   this.checkDomainsNearEndDate();
    //   console.log("hello");

    // });
  };

  checkDomainsNearEndDate(): void {
    this.domainS.getAllDomains().subscribe((domains: any) => {
      const currentDate = new Date();

      console.log(domains);

      domains.data.forEach((domain: any) => {
        const endDate = new Date(domain.endDate);
        const daysUntilEnd = Math.floor((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        // Assuming you want to send an alert when there is one month left or less (you can adjust this threshold)
        if (daysUntilEnd <= 30) {
          this.sendAlertToClient(domain.client.email, domain.domainName, domain.client.name);
        }

        console.log(domain.client.email, daysUntilEnd);

      });
    });
  }

  sendAlertToClient(clientEmail: string, domainName: string, name: String): void {
    // You can use your preferred method to send an alert, such as sending an email

    // For simplicity, let's assume you have a backend API to send emails


    const emailContent = `
        Dear ${name},

        I trust this message finds you well. We wanted to bring to your attention an important matter regarding your online presence.

        Subject: Urgent: Domain Expiry Alert

        We wish to inform you that the domain "${domainName}" is set to expire in one month. To ensure uninterrupted service and maintain your online identity, we recommend taking prompt action to renew your domain.

        Please consider the following steps:
        1. Review the expiration date of your domain "${domainName}".
        2. Initiate the renewal process well in advance to avoid any potential disruptions.
        3. Verify and update your contact information to receive timely notifications about your domain status.

        If you have any questions or require assistance with the renewal process, feel free to reach out to our support team at support@carthaeHosting.com.

        Thank you for choosing our services. We appreciate your attention to this matter and value your continued partnership.

        Best regards,
        Carthage Hosting
        `;

    this.http.post('http://localhost:3000/api/v1/send-email', {
      to: clientEmail,
      subject: 'Urgent: Domain Expiry Alert',
      message: emailContent,
    }).subscribe(
      (res: any) => {
        console.log('Email sent successfully', res);
      },
      (error: any) => {
        console.error('Error sending email', error);
      });

  }


  public client: any[] = [];

  ngOnInit(): void {
    this.clientS.getAllClients().subscribe((res: any) => {
      this.client = res.clients;
    })

    this.getDomains();
    this.addDomain = this.fb.group({
      client: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      buyingPrice: ['', Validators.required],
      status: [false, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      domainName: ['', Validators.required],
      hostOvhOffer: ['', Validators.required],
      domain: [false, Validators.required], // boolean value
      hosting: [false, Validators.required], // boolean value
      mail: [false, Validators.required], // boolean value
    });
  }






  getDomains(): void {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        console.log(res);

        this.domains = res.data;
        this.filtereddomains = [...this.domains];
        // console.log('domains:', this.domains);
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  viewdomain(domain: any): void {
    console.log('View domain:', domain);

    // Assuming 'id' is a property in your domain object
    const domainId = domain._id;

    // Navigate to the domain details page with the domain ID
    this.router.navigate(['/admin/domains/domain', domainId]);
  }

  // Function to edit a domain
  editdomain(domain: any): void {
    // Assuming you have a form group for editing (editdomainForm)
    this.addDomain.patchValue({
      client: domain.client._id,
      purchasePrice: domain.purchasePrice,
      buyingPrice: domain.buyingPrice,
      status: domain.status,
      startDate: this.formatDate(domain.startDate),
      endDate: this.formatDate(domain.endDate),
      domainName: domain.domainName,
      hostOvhOffer: domain.hostOvhOffer,
      domain: domain.domain, // boolean value
      hosting: domain.hosting, // boolean value
      mail: domain.mail, // boolean value
    });

    this.id = domain._id;

    // Show the modal
    document.getElementById('editUserModal')?.classList.remove('hidden');

  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Format the date as a string in "YYYY-MM-DD" format
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  submitForm() {
    if (this.addDomain.valid) {

      const formData = { ...this.addDomain.value }; // Convert FormGroup to a plain object

      // Send formData to the server
      this.http.put(`${this.baseUrl}/Domain/${this.id}`, formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.getDomains();
            this.closeModel();
          }
        }
      );

    } else {
      console.log("not valid");

    }
  }

  public closeModel() {
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  // Function to delete a domain
  deletedomain(domain: any): void {
    this.domainS.deleteDomain(domain._id).subscribe((res: any) => {
      console.log(res);
      this.getDomains();
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);

    this.filtereddomains = this.domains.filter(domain =>
      domain.client.name.toLowerCase().includes(filterValue) ||
      domain.domainName.toLowerCase().includes(filterValue) ||
      domain.hostOvhOffer.toLowerCase().includes(filterValue) ||
      this.formatReadableDate(domain.startDate).toLowerCase().includes(filterValue) ||
      this.formatReadableDate(domain.endDate).toLowerCase().includes(filterValue) ||
      domain.purchasePrice.toString().includes(filterValue) ||
      domain.buyingPrice.toString().includes(filterValue)
    );
  }





}
