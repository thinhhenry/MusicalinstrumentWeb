import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { MusicalInsService, CategoryWithMusicalIns } from '../../../Service/MusicalInsService/musical-ins.service';
import { CategoryService, Category } from '../../../Service/CategoryService/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }
  categories: Category[] = []
  CategoryWithMusicalInsList: CategoryWithMusicalIns[] = [];
  currentSlide: number = 0;
  carts: Array<{ music_id: number, music_name: string, music_img: string, music_price: number }> = [];

  @ViewChild('heroSlider', { static: true }) heroSlider!: ElementRef;

  constructor(
    private musicalinsService: MusicalInsService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategoriesWithInstruments();
    this.loadCategories();
  }

  addCart(music_id: number, music_name: string, music_img: string, music_price: number) {
    const customerId = sessionStorage.getItem('customer_id');
    const total_price = music_price;

    if (customerId) {
        let storedCarts = sessionStorage.getItem('carts');
        this.carts = storedCarts ? JSON.parse(storedCarts) : [];

        const existingItem = this.carts.find(item => item.music_id === music_id);
        
        if (existingItem) {
            this.toastr.warning('Sản phẩm đã có trong giỏ hàng.', 'Cảnh báo');
            return; 
        }

        const item = {
            music_id: music_id,
            music_name: music_name,
            music_img: music_img,
            music_price: music_price,
            music_quantity: 1,
            total_price: total_price,
            customer_id: customerId
        };

        this.carts.push(item);
        sessionStorage.setItem('carts', JSON.stringify(this.carts));
        
        this.toastr.success('Thêm vào giỏ hàng thành công!', 'Thành công');
    } else {
        this.toastr.warning('Bạn cần đăng nhập để thêm vào giỏ hàng.', 'Cảnh báo');
    }
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

  loadCategoriesWithInstruments(): void {
    this.musicalinsService.getMusicalInsList().subscribe(data => {
      this.CategoryWithMusicalInsList = data.map(categoryWithMusicalIns => ({
        ...categoryWithMusicalIns,
        instruments: categoryWithMusicalIns.instruments.map(instrument => ({
          ...instrument,
          music_price: instrument.music_price != null ? parseFloat(instrument.music_price.toString()) : 0
        }))
      }));
    });
  }

  selectedCategoryId: number | null = null;

  filterByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  //Chuyển banner
  nextSlide(): void {
    const slides = this.heroSlider.nativeElement.querySelectorAll('.single-slider');
    slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    slides[this.currentSlide].classList.add('active');
  }

  prevSlide(): void {
    const slides = this.heroSlider.nativeElement.querySelectorAll('.single-slider');
    slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
    slides[this.currentSlide].classList.add('active');
  }
}
