import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {catchError, delay, map, Observable, of} from 'rxjs';
import {Customer} from '../models/customer.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {

  customers$: Observable<Customer[]> | undefined;

  errorMsg: string | undefined;
  searchformGroup: FormGroup | undefined;

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchformGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.customers$ = this.customerService
      .getCustomers()
      .pipe(delay(1000),

        catchError(err => {
          this.errorMsg = err.message;
          return of([]);
        })
      );
  }

  handleSearchCustomers() {
    let keyword = this.searchformGroup?.value.keyword;
    this.customers$ = this.customerService
      .handleSearchCustomers(keyword)
      .pipe(
        delay(100),
        catchError(err => {
          this.errorMsg = err.message;
          return of([]);
        })
      );

  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.customerService.deleteCustomer(c).subscribe(res => {
      this.customers$ = this.customers$?.pipe(
        map(data => {
          let index = data.indexOf(c);
          data.slice(index, 1);
          return data;
        })
      );
    });
  }
}
