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
}
