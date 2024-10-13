import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MusicalInsService } from '../../../Service/MusicalInsService/musical-ins.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  carts: Array<any> = [];
  totalAmount: number = 0;

  calculateTotalAmount(): number {
    return this.carts.reduce((acc, item) => acc + item.total_price, 0);
  }

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

  constructor(private toastr: ToastrService, private musical: MusicalInsService) { }

  ngOnInit(): void {
    const storedCarts = sessionStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
      this.totalAmount = this.calculateTotalAmount();
    }
  }

  removeProduct(musicId: number): void {
    const storedCarts = sessionStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);

      this.carts = this.carts.filter(item => item.music_id !== musicId);

      sessionStorage.setItem('carts', JSON.stringify(this.carts));

      this.totalAmount = this.calculateTotalAmount();
    }
  }

  decreaseQuantity(item: any) {
    if (item.music_quantity > 1) {
      item.music_quantity--;
      item.total_price = item.music_price * item.music_quantity;
      this.totalAmount = this.calculateTotalAmount();
      this.updateCart();
    } else {
      this.toastr.warning('Số lượng không thể giảm về 0!', 'Thông báo');
    }
  }

  increaseQuantity(item: any) {
    const requestedQuantity = item.music_quantity + 1;

    this.musical.checkStock(item.music_id, requestedQuantity).subscribe({
      next: (response) => {
        item.music_quantity++;
        item.total_price = item.music_price * item.music_quantity;
        this.totalAmount = this.calculateTotalAmount();
        this.updateCart();
      },
      error: (error) => {
        this.toastr.warning('Số lượng không đủ đáp ứng! Không thể tăng thêm', 'Thông báo');
      }
    });
  }

  updateCart() {
    sessionStorage.setItem('carts', JSON.stringify(this.carts));
  }
}
