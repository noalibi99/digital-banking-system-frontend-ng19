import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup | undefined;


  constructor (private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit () {
    this.loginFormGroup = this.fb.group(
      {
        username: this.fb.control(''),
        password: this.fb.control('')
      }
    );
  }

  handleLogin(): void {
    const username: string = this.loginFormGroup?.value.username ?? '';
    const password: string = this.loginFormGroup?.value.password ?? '';

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: (err) => {
        alert('Login failed: ' + (err?.error?.message || err?.message || 'Unknown error'));
      }
    });
  }

}
