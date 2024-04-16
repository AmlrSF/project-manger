import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  public addClient!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addClient = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submitForm() {
    // Handle form submission logic here
    if (this.addClient.valid) {
      console.log('Form submitted:', this.addClient.value);



    } else {

      console.log('Form has validation errors');
    }
  }
}
