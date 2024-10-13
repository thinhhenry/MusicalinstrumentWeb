import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService, AccountDTO } from '../Service/AccountService/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm: FormGroup;
  successMessage: string | null = '';
  role: string = ''

  constructor(private fb: FormBuilder, private accService: AccountService, private router: Router) {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const usernameValue = this.LoginForm.get('username')?.value;
    const passwordValue = this.LoginForm.get('password')?.value;

    if (this.LoginForm.valid) {
      this.accService.checkLogin(usernameValue, passwordValue).subscribe({
        next: (response: AccountDTO) => {
          sessionStorage.setItem('customer_id', response.customer_id.toString());
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('role', response.role);

          this.role = sessionStorage.getItem('role') ?? '';
          if (this.role === 'user') {
            window.location.href = '/';
          }
          else {
            this.router.navigate(['/admin'])
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.successMessage = 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại thông tin.';
        }
      });
    }
  }

}
