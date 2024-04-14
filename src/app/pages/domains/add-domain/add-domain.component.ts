import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { DomainsService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.css']
})
export class AddDomainComponent implements OnInit {

  public addDomain !: FormGroup;
  public client: any[] = [];

  constructor(private fb: FormBuilder, private clientS:ClientsService,private domainS: DomainsService) { }




  ngOnInit(): void {
    
    this.clientS.getAllClients().subscribe((res:any)=>{
      this.client = res.clients;
    })

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
  submitForm(): void {
    if (this.addDomain.valid) {
     
      this.domainS.addDomain(this.addDomain.value).subscribe(
        (res:any)=>{
          if(res.success){
            this.addDomain.reset();
          }
          
        }
      )

    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
