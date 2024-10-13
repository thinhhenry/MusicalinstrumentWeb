import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { CategoryService, Category } from '../../../Service/CategoryService/category.service';
import { MusicalInsService, MusicalIns } from '../../../Service/MusicalInsService/musical-ins.service';
import { MusicalinsDTO } from '../../../Service/MusicalInsService/apiupdate.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  quantity: number = 1;
  carts: Array<{ music_id: number, music_name: string, music_img: string, music_price: number }> = [];
  check: boolean = true;

  musical: MusicalinsDTO = {
    music_id: 0,
    music_name: '',
    music_img: '',
    music_price: 0,
    music_Picture: null,
    music_quantity: 0,
    music_category_id: 0
  };

  musicali: MusicalIns[] = [];

  categories: Category | null = null;

  constructor(
    private cate: CategoryService,
    private route: ActivatedRoute,
    private musicalInsService: MusicalInsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMusical();
    if (typeof sessionStorage !== 'undefined') {
      const storedUsername = sessionStorage.getItem('customer_id');

      if (storedUsername) {
        this.check = true;
      } else {
        this.check = false;
      }
    }

  }

  buyNow(music_id: number, music_name: string, music_img: string, music_price: number, music_quantity: number) {
    if (music_quantity < 1) {
      this.toastr.warning('Số lượng sản phẩm phải tối thiểu là 1', 'Thông báo');
      return;  
    }

    this.musicalInsService.checkStock(music_id, music_quantity).subscribe({
      next: (response) => {
        const total_price = music_price * music_quantity;

        const item = {
          music_id: music_id,
          music_name: music_name,
          music_img: music_img,
          music_price: music_price,
          music_quantity: music_quantity,
          total_price: total_price
        };

        this.carts = []; 
        this.carts.push(item);
        sessionStorage.setItem('buy_now', JSON.stringify(this.carts));

        this.router.navigate(['/payment']);
      },
      error: (error) => {
        this.toastr.warning('Số lượng không đủ đáp ứng! Vui lòng chọn số lượng ít hơn', 'Thông báo');
      }
    });
}


  getCategoryById(category_id: number) {
    this.cate.getCategoryById(category_id).subscribe({
      next: (category) => {
        this.categories = category;
        console.log('Category:', category);
      },
      error: (error) => {
        console.error('Error fetching category', error);
      }
    });
  }

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

  loadMusical() {
    const music_id = this.route.snapshot.paramMap.get('id');
    if (music_id) {
      this.musicalInsService.getMusicalById(+music_id).subscribe({
        next: (data: MusicalIns) => {
          this.musical = data;
          this.getCategoryById(this.musical.music_category_id)
        },
        error: (error) => {
          console.error('Error fetching musical', error);
        }
      });
    }
  }

}
