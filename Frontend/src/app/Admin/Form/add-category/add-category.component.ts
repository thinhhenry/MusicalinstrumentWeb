import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../Service/CategoryService/category.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toast: ToastrService) {
    this.categoryForm = this.fb.group({
      category_name: ['', Validators.required],
    });
  }

  onSubmit() {
    const categoryName = this.categoryForm.value.category_name; 
    if (this.categoryForm.valid) {
      this.categoryService.checkCategoryExists(categoryName).subscribe({
        next: (count) => {
          if (count > 0) {
            this.toast.warning('Loại nhạc cụ này đã tồn tại!','Cảnh báo')
          } else {
            this.categoryService.addCategory(this.categoryForm.value).subscribe({
              next: () => {
                this.toast.success('Đã thêm loại nhạc cụ mới.','Thành công')
                this.categoryForm.reset();
              },
              error: (err) => {
                console.error('Error:', err);
              },
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
