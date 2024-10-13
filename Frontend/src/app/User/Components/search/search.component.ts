import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { MusicalInsService, CategoryWithMusicalIns } from '../../../Service/MusicalInsService/musical-ins.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResults: CategoryWithMusicalIns[] = [];
  carts: Array<{ music_id: number, music_name: string, music_img: string, music_price: number }> = [];

  constructor(private route: ActivatedRoute, private musical: MusicalInsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.musical.searchMusical(query).subscribe((results: CategoryWithMusicalIns[]) => {
          this.searchResults = results;
        });
      }
    });
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

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

}
