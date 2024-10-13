import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MusicalInsService, CategoryWithMusicalIns, MusicalIns } from '../../../Service/MusicalInsService/musical-ins.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  CategoryWithMusicalInsList: CategoryWithMusicalIns[] = [];
  musicali: MusicalIns[] = []; 
  musicalSearch: MusicalIns[] = [];
  searchForm!: FormGroup;

  constructor(
    private musicalinsService: MusicalInsService,
    private router: Router,
    private fb: FormBuilder, private toast: ToastrService
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategoriesWithInstruments();
    this.searchForm.get('searchQuery')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.trim().length === 0) {
          return this.musicalinsService.getMusicalInsList();
        } else {
          return this.musicalinsService.searchMusical(value);
        }
      })
    ).subscribe({
      next: (musicalSearch: CategoryWithMusicalIns[]) => {
        this.CategoryWithMusicalInsList = musicalSearch.map(categoryWithMusicalIns => ({
          ...categoryWithMusicalIns,
          instruments: categoryWithMusicalIns.instruments.map(instrument => ({
            ...instrument,
            music_price: instrument.music_price != null ? parseFloat(instrument.music_price.toString()) : 0
          }))
        }));
      },
      error: (error) => {
        if (error.error && error.error.error) {
          console.error('Error searching categories:', error.error.error);
        } else {
          console.error('Error searching categories:', error); 
        }
      },
      complete: () => {
        console.log('Search or list loading completed');
      }
    });    
  }

  deleteProduct(music_id: number){
    if (confirm('Are you sure you want to delete this product?')) {
      this.musicalinsService.deleteProduct(music_id).subscribe({
        next: () => {
          this.loadCategoriesWithInstruments();
          this.toast.success('Đã xóa sản phẩm.','Thành công')
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category');
        }
      });
    }
  }

  editProduct(music_id: number) {
    this.router.navigate(['/admin/product/edit', music_id]);
  }

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

  loadCategoriesWithInstruments(): void {
    this.musicalinsService.getMusicalInsList().subscribe(data => {
      this.CategoryWithMusicalInsList = data.map(categoryWithMusicalIns => {
        const sortedInstruments = categoryWithMusicalIns.instruments
          .map(instrument => ({
            ...instrument,
            music_price: instrument.music_price != null ? parseFloat(instrument.music_price.toString()) : 0
          }))
  
        return {
          ...categoryWithMusicalIns,
          instruments: sortedInstruments
        };
      });
       
      this.CategoryWithMusicalInsList.sort((a, b) => a.category.category_id - b.category.category_id);
    });
  }    
}
