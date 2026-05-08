import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-new-customer-component',
  standalone: false,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup: FormGroup | undefined;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    let newCustomer: Customer = this.newCustomerFormGroup?.value;
    this.customerService.saveCustomer(newCustomer).subscribe({
      next: data => {
        alert("Customer saved successfully");
        this.newCustomerFormGroup?.reset();
      },
      error: err => {
        alert(err.message);
      }
    });
  }

}
