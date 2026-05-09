import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountDetails} from '../models/account.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccounts() {
    return this.http.get<AccountDetails[]>(`${environment.apiUrl}/accounts`);
  }

  public getAccountById(accountId: string, page: number = 0, size: number = 5) {
    return this.http.get<AccountDetails>(
      `${environment.apiUrl}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`
    );
  }

  public debit(accountId: string, amount: number, description: string) {
    return this.http.post(`${environment.apiUrl}/accounts/debit`, {
      accountId,
      amount,
      description
    });
  }

  public credit(accountId: string, amount: number, description: string) {
    return this.http.post(`${environment.apiUrl}/accounts/credit`, {
      accountId,
      amount,
      description
    });
  }

  public transfer(sourceAccountId: string, destinationAccountId: string, amount: number) {
    return this.http.post(`${environment.apiUrl}/accounts/transfer`, {
      sourceAccountId,
      destinationAccountId,
      amount
    });
  }

}
