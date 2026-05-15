import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from './customers/customer.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {authenticationGuard} from './guards/authentication.guard';
import {authorizationGuard} from './guards/authorization.guard';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "not-authorized", component: NotAuthorizedComponent},
  {path: "admin", component: AdminTemplateComponent, canActivate: [authenticationGuard],
    children: [
      {path: 'customers', component: CustomerComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'new-customer', component: NewCustomerComponent, canActivate: [authorizationGuard], data: {role: "ADMIN"}},
      {path: 'customer-accounts/:id', component: CustomerAccountsComponent},
    ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
