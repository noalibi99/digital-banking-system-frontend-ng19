import {Customer} from './customer.model';

export interface BankAccountModel {
  id:            string;
  balance:       number;
  createdAt:     Date;
  status:        string;
  customerDTO: Customer;
  currency:      string;
  overDraft?:    number;
  type:          string;
  interestRate?: number;

  showId?: boolean;
}
