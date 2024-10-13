import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { CategoryService, Category } from '../../../Service/CategoryService/category.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  category: Category = { category_id: 0, category_name: '' };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(Number(id)).subscribe({
        next: (category: Category) => {
          this.category = category;
        },
        error: (err) => {
          console.error('Error fetching category by ID:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.category.category_name) {
      this.categoryService.checkCategoryExists(this.category.category_name).subscribe({
        next: (count) => {
          if (count > 0) {
            this.toast.warning('Loại nhạc cụ này đã tồn tại!','Cảnh báo')
          } else {
            this.categoryService.updateCategory(this.category.category_id, this.category).subscribe({
              next: () => {          
                this.toast.success('Đã cập nhật loại nhạc cụ.','Thành công')
              },
              error: (err) => {
                console.error('Error updating category:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error checking category existence:', err);
        }
      });
    }
  }
}
