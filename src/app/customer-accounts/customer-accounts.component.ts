import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../models/customer.model';
import {Observable} from 'rxjs';
import {BankAccountModel} from '../models/bank-account.model';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-customer-accounts',
  standalone: false,
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {

  customerId!: number;
  customer!: Customer;
  accounts$!: Observable<BankAccountModel[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.accounts$ = this.customerService.getCustomerAccounts(this.customerId);
  }
  
}
