import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MusicalInsService } from '../../../Service/MusicalInsService/musical-ins.service';
import { CategoryService } from '../../../Service/CategoryService/category.service';

export interface Category {
  category_id: number;
  category_name: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent implements OnInit {
  MusicalForm!: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;
  fileError: boolean = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private musicalinsService: MusicalInsService,
    private categoryService: CategoryService, private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.MusicalForm = this.fb.group({
      music_name: [null, [Validators.required]],
      music_price: [null, [Validators.required, Validators.min(1000)]],
      music_quantity: [null, [Validators.required, Validators.min(1)]],
      category_id: [null, [Validators.required]]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.validateFile(file)) {
      this.selectedFile = file;
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  }

  onSubmit(): void {
    const categoryId = this.MusicalForm.get('category_id')?.value;

    if (this.MusicalForm.valid && this.selectedFile) {
      const formData = new FormData();

      formData.append('music_name', this.MusicalForm.get('music_name')?.value);
      formData.append('music_price', this.MusicalForm.get('music_price')?.value);
      formData.append('music_quantity', this.MusicalForm.get('music_quantity')?.value);
      formData.append('music_category_id', categoryId);
      formData.append('music_img', this.selectedFile);
      formData.append('file_name', this.selectedFile.name);

      this.musicalinsService.addProduct(formData).subscribe({
        next: (response) => {
          
          this.successMessage = response.message; 
          this.MusicalForm.reset();
          this.selectedFile = null;
          this.toast.success('Đã thêm sản phẩm mới.','Thành công')
        },
        error: (error) => {
          console.error('Lỗi khi thêm sản phẩm:', error);
        }
      });

    }
  }

}
