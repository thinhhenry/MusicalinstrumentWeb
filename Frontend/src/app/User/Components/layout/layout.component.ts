import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  username: string | null = '';
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username');
    } 
  }

  onSubmit(){
    const query = this.searchForm.get('searchQuery')?.value;
    if (query) {
      this.router.navigate(['/search'], { queryParams: { query: query } });
    }
  }

  logout(event: MouseEvent){
    event.preventDefault();
    sessionStorage.removeItem('customer_id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    window.location.href = '/';
  }
}
