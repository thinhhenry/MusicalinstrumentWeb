import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderDetailDTO } from '../../../Service/OrderService/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-order.component.html',
  styleUrl: './search-order.component.css'
})
export class SearchOrderComponent implements OnInit {
  searchResults: OrderDetailDTO[] = [];
  searchQuery: number | null = null;
  showNoResultsMessage: boolean = false;
  selectedOrderDetails: OrderDetailDTO[] = [];
  firstSelectedOrderDetail: OrderDetailDTO | null = null;

  constructor(private order: OrderService) { }

  ngOnInit(): void { }

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

  isModalOpen: boolean = false;
  closeModal(): void {
    this.isModalOpen = false;
  }

  onSearch(): void {

    this.showNoResultsMessage = false;

    if (this.searchQuery !== null) {
      this.order.searchOrder(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results;
          if (this.searchResults.length === 0) {
            this.showNoResultsMessage = true; 
          }
        },
        error: (err) => {
          console.error('Lỗi khi tìm kiếm đơn hàng', err);
          this.showNoResultsMessage = true; 
        }
      });
    } else {
      this.showNoResultsMessage = true; 
    }
  }

  openOrderDetails(orderId: number): void {
    this.isModalOpen = true;
    this.order.getOrderDetails(orderId).subscribe({
      next: (OD: OrderDetailDTO[]) => {
        this.selectedOrderDetails = OD;
        if (this.selectedOrderDetails.length > 0) {
          console.log('Response from server:', OD);
          this.firstSelectedOrderDetail = this.selectedOrderDetails[0];
        }
      },
      error: (error) => {
        console.error('Error fetching order details', error);
      }
    });
  }
}
