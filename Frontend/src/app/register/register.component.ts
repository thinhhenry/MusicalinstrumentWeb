import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../Service/AccountService/account.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  usernameExists: boolean = false;

  constructor(private fb: FormBuilder, private accountService: AccountService, private toast: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_phone: ['', Validators.required],
      customer_address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkUsername(): void {
    const username = this.registerForm.get('username')?.value;

    if (username) {
      this.accountService.searchAccByName(username).subscribe({
        next: (data) => {
          this.usernameExists = data && data.length > 0;
        },
        error: (err) => {
          console.error('Lỗi khi kiểm tra username:', err.message);
          this.usernameExists = false;
        }
      });
    }
  }

  onSubmit(): void {
    
    if (this.registerForm.valid && !this.usernameExists) {
      const formData = new FormData();

      formData.append('customer_name', this.registerForm.get('customer_name')?.value);
      formData.append('customer_phone', this.registerForm.get('customer_phone')?.value);
      formData.append('customer_address', this.registerForm.get('customer_address')?.value);
      formData.append('username', this.registerForm.get('username')?.value);
      formData.append('password', this.registerForm.get('password')?.value);

      this.accountService.addAccount(formData).subscribe({
        next: (response) => {
          console.log('Tài khoản đã được tạo:', response);
          this.toast.success('Đã tạo tài khoản.','Thành công')
          this.route.navigate(['/login'])
        },
        error: (error) => {
          console.error('Lỗi khi tạo tài khoản:', error.message);
          alert('Đã xảy ra lỗi khi tạo tài khoản');
        }
      });
    }
  }
}
