import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from './customers/customer.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';

const routes: Routes = [
  {path: 'customers', component: CustomerComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'new-customer', component: NewCustomerComponent},
  {path: 'customer-accounts/:id', component: CustomerAccountsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
