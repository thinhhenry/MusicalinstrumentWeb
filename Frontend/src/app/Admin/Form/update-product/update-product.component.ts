import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiupdateService } from '../../../Service/MusicalInsService/apiupdate.service';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Thêm FormBuilder, FormGroup, Validators
import { CategoryService, Category } from '../../../Service/CategoryService/category.service';
import { MusicalInsService } from '../../../Service/MusicalInsService/musical-ins.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from '../../../../../node_modules/rxjs';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  musicalForm!: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private musicalInstrumentService: ApiupdateService,
    private musicalIns: MusicalInsService,
    private cate: CategoryService,
    private route: ActivatedRoute, private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadMusical();
  }

  initForm() {
    this.musicalForm = this.fb.group({
      music_name: ['', [Validators.required]],
      music_price: [0, [Validators.required, Validators.min(1000)]],
      music_quantity: [0, [Validators.required, Validators.min(1)]],
      music_category_id: ['', [Validators.required]] 
    });
  }

  loadMusical() {
    const music_id = this.route.snapshot.paramMap.get('id');

    if (music_id) {
      forkJoin({
        categories: this.cate.getCategoryList(),
        musical: this.musicalIns.getMusicalById(+music_id)
      }).subscribe({
        next: ({ categories, musical }) => {
          this.categories = categories;

          this.musicalForm.patchValue({
            music_name: musical.music_name,
            music_price: musical.music_price,
            music_quantity: musical.music_quantity,
            music_category_id: musical.music_category_id 
          });
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if(this.validateFile(file)){
      this.selectedFile = file;
      this.fileError = false;
    }
    else{
      this.fileError = true;
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  }

  updateMusical() {
    if (this.musicalForm.valid) {
      const formData = new FormData();

      formData.append('music_id', this.route.snapshot.paramMap.get('id')!);  
      formData.append('music_name', this.musicalForm.get('music_name')?.value);
      formData.append('music_price', this.musicalForm.get('music_price')?.value.toString());
      formData.append('music_quantity', this.musicalForm.get('music_quantity')?.value.toString());
      formData.append('music_category_id', this.musicalForm.get('music_category_id')?.value.toString());

      const musicPicture = this.selectedFile;
      if (this.selectedFile) {
        formData.append('music_img', this.selectedFile.name); 
      }
      if (musicPicture) {
        formData.append('music_Picture', musicPicture);
      }

      this.musicalInstrumentService.updateMusical(formData).subscribe({
        next: (response) => {
          console.log('Update successful', response);
          this.toast.success('Đã cập nhật thông tin sản phẩm.','Thành công')
        },
        error: (error) => {
          console.error('Error updating', error);
        },
        complete: () => {
          console.log('Update process complete.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
