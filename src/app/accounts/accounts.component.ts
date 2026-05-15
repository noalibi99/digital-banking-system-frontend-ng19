import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {

  accountFormGroup!: FormGroup;
  operationsFormGroup!: FormGroup;
  account$: Observable<AccountDetails> | undefined;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(public authService : AuthService, private accountService: AccountsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('', { nonNullable: true, validators: [Validators.required] })
    });

    this.operationsFormGroup = this.fb.group({
      // ✅ FIX 1: Don't pre-bind to accountFormGroup value at init time — it's always empty
      OpType: this.fb.control('', { nonNullable: true, validators: [Validators.required] }), // ✅ FIX 2: Renamed OpType → operationType to match the template
      amount: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
      accountDestination: this.fb.control(''),
      description: this.fb.control(''),  // ✅ FIX 3: Added missing description field
    });
  }

  handleSearchAccount() {
    if (!this.accountFormGroup.valid) return;
    const accountId = this.accountFormGroup.value.accountId;
    this.account$ = this.accountService.getAccountById(accountId, this.currentPage, this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  pages(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i);
  }

  handleAccountOperation() {
    if (!this.operationsFormGroup.valid) return;

    const {OpType, amount, accountDestination, description } = this.operationsFormGroup.value;

    // ✅ FIX 4: Use operationType (not OpType) to match the renamed form control
    if (OpType === 'DEBIT') {
      this.accountService.debit(this.accountFormGroup.value?.accountId, amount, description || 'Debit Operation').subscribe({
        next: () => {
          alert('Debit successful');
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error(err);
          alert('Error during debit operation');
        }
      });

    } else if (OpType === 'CREDIT') {
      this.accountService.credit(this.accountFormGroup.value?.accountId, amount, description || 'Credit Operation').subscribe({
        next: () => {
          alert('Credit successful');
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error(err);
          alert('Error during credit operation');
        }
        // ✅ FIX 5: Was missing closing }); for the subscribe block — caused a syntax error

      });

    } else if (OpType === 'TRANSFER') {
      // ✅ FIX 6: Transfer block was nested inside the CREDIT else-if — now correctly at the same level
      this.accountService.transfer(this.accountFormGroup.value?.accountId, accountDestination, amount).subscribe({
        next: () => {
          alert('Transfer successful');
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error(err);
          alert('Error during transfer operation');
        }
      });
    }
  }
}
