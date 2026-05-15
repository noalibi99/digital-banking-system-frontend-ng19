import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {catchError, delay, map, Observable, of} from 'rxjs';
import {Customer} from '../models/customer.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {

  customers$: Observable<Customer[]> | undefined;

  errorMsg: string | undefined;
  searchFormGroup: FormGroup | undefined;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });


    this.loadCustomers();
  }

  private loadCustomers(keyword?: string) {
    // clear previous error
    this.errorMsg = undefined;

    const source$ = keyword
      ? this.customerService.handleSearchCustomers(keyword)
      : this.customerService.getCustomers();

    this.customers$ = source$.pipe(
      delay(500),
      catchError(err => {
        this.errorMsg = err?.error?.message || err?.message || 'Failed to load customers';
        return of([] as Customer[]);
      })
    );
  }


  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword;
    this.customers$ = this.customerService
      .handleSearchCustomers(keyword)
      .pipe(
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

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl('/admin/customer-accounts/' + customer.id, {state: customer});
  }
}
