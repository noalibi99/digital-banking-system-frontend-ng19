import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customers: any;

  constructor(private customerService : CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
      },
      error: err => {
        console.error('Error fetching customers:', err);
       }
    });
  }
}
