import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from './customers/customer.component';
import {AccountsComponent} from './accounts/accounts.component';

const routes: Routes = [
  {path: 'customers', component: CustomerComponent},
  {path: 'accounts', component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
