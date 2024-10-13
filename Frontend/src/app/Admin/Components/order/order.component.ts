import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { OrderService, Order, OrderDetailDTO } from '../../../Service/OrderService/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent{
  OrderList: Order[] = [];
  selectedOrderDetails: OrderDetailDTO[] = [];
  firstSelectedOrderDetail: OrderDetailDTO | null = null;
  OD: OrderDetailDTO[] = [];
  updatedOrderStatus: number | null = null;

  constructor(
    private order: OrderService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadOrder()
  }

  loadOrder(){
    this.order.getOrderList().subscribe(data => {
      this.OrderList = data.sort((a, b) => a.order_id - b.order_id);
    })
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
          this.updatedOrderStatus = this.firstSelectedOrderDetail.orderStatus;
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

  updateOrderStatus(orderId: number | null, updatedStatus: number | null): void {
    if (orderId !== null && updatedStatus !== null) {
      this.order.updateOrderStatus(orderId, updatedStatus).subscribe({
        next: (response) => {
          console.log('Order status updated successfully', response);
          this.toast.success('Đã chuyển trạng thái cho đơn hàng này','Thành công')
          this.closeModal();
          this.loadOrder()
        },
        error: (error) => {
          console.error('Error updating order status', error);
        }
      });
    } else {
      console.error('Invalid order ID or status');
    }
  }

}





