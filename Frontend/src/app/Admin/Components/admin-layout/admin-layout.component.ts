import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { CategoryComponent } from '../category/category.component';
import { AddCategoryComponent } from '../../Form/add-category/add-category.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductComponent , CategoryComponent, AddCategoryComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{
  currentRoute: string = '';
  username: string | null = '';
  role: string | null = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; 
      }
    });
  }

  ngOnInit(): void {
    const storedUsername = sessionStorage.getItem('username');
    const storedRole = sessionStorage.getItem('role');
    if (storedUsername && storedRole) {
      this.username = storedUsername;
      this.role = storedRole;
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
