import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order, OrderDetailDTO } from '../../../Service/OrderService/order.service';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {
  OrderList: Order[] = [];
  selectedOrderDetails: OrderDetailDTO[] = [];
  firstSelectedOrderDetail: OrderDetailDTO | null = null;
  OD: OrderDetailDTO[] = [];
  constructor(
    private order: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadOrder()
  }

  loadOrder() {
    const customerId = sessionStorage.getItem('customer_id');

    if (customerId) {
      this.order.getOrdersByCustomer(Number(customerId)).subscribe({
        next: (data) => {
          this.OrderList = data.sort((a, b) => {
            return new Date(b.order_date).getTime() - new Date(a.order_date).getTime();
          });
        },
        error: (error) => {
          console.error('Lỗi khi tải danh sách đơn hàng:', error);
        }
      });
    } else {
      console.warn('customer_id không có trong sessionStorage');
    }
  }

  isModalOpen: boolean = false;
  closeModal(): void {
    this.isModalOpen = false;
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

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }
}
