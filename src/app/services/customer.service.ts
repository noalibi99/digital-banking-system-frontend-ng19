import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {Customer} from '../models/customer.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor (private http: HttpClient) {}

  getCustomers():Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.apiUrl+'/customers');
  }

  handleSearchCustomers(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.apiUrl+`/customers/search?keyword=${keyword}`);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.apiUrl+'/customers', customer);
  }

  deleteCustomer(customer: Customer){
    return this.http.delete<void>(environment.apiUrl+`/customers/${customer.id}`);
  }
}
