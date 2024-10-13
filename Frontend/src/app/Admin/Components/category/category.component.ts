import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CategoryService, Category } from '../../../Service/CategoryService/category.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  searchForm!: FormGroup;
  CategoryList: Category[] = [];
  CategorySearch: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder, private toast: ToastrService
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(data => {
      this.CategoryList = data.sort((a, b) => a.category_id - b.category_id);
    })
    this.searchForm.get('searchQuery')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.trim().length === 0) {
          return this.categoryService.getCategoryList();
        } else {
          return this.categoryService.searchCategory(value);
        }
      })
    ).subscribe({
      next: (CategorySearch: Category[]) => {
        this.CategoryList = CategorySearch.sort((a, b) => a.category_id - b.category_id);
      },
      error: (error) => {
        console.error('Error searching categories', error);
      },
      complete: () => {
        console.log('Search or list loading completed');
      }
    });
  }

  editCategory(category_id: number) {
    this.router.navigate(['/admin/category/edit', category_id]);
  }

  deleteCategory(category_id: number) {
    if (confirm('Bạn có chắc muốn xóa category này?')) {
      this.categoryService.deleteCategory(category_id).subscribe({
        next: () => {
          this.CategoryList = this.CategoryList.filter(category => category.category_id !== category_id);
          this.toast.success('Đã xóa loại nhạc cụ.','Thành công')
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category');
        }
      });
    }
  }
}
