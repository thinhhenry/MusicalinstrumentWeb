import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../../../Service/CustomerService/customer.service';
import { OrderService, Order_Detail } from '../../../Service/OrderService/order.service';
import { response } from 'express';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  customer: Customer = {
    customer_id: 0,
    customer_name: '',
    customer_phone: '',
    customer_address: ''
  }
  carts: Array<any> = [];
  buy: Array<any> = [];
  totalAmount: number = 0;
  totalAmountbuy: number = 0;
  CustomerForm!: FormGroup;
  CustomerForm_no_active!: FormGroup;
  customer_id: number = 0;
  order_detail: Array<Order_Detail> = [];
  login_active: boolean = true;

  calculateTotalAmount(): number {
    return this.carts.reduce((acc, item) => acc + item.total_price, 0);
  }

  calculateTotalAmountBuy(): number {
    return this.buy.reduce((acc, item) => acc + item.total_price, 0);
  }

  getEncodedImageUrl(filename: string): string {
    return encodeURIComponent(filename);
  }

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private order: OrderService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const storedCustomerId = sessionStorage.getItem('customer_id');
      if (storedCustomerId) {
        this.customer.customer_id = +storedCustomerId;
        this.login_active = true
      }
      else {
        this.login_active = false
      }
    }
    if (this.customer.customer_id !== 0) {
      this.customerService.getCustomerById(Number(this.customer.customer_id)).subscribe({
        next: (customer: Customer) => {
          this.customer = customer;

          this.CustomerForm.patchValue({
            customer_name: this.customer.customer_name,
            customer_phone: this.customer.customer_phone,
            customer_address: this.customer.customer_address
          });
        },
        error: (err) => {
          console.error('Error fetching customer by ID:', err);
        }
      });
    }
    const storedCarts = sessionStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
      this.totalAmount = this.calculateTotalAmount();
    }
    const buynow = sessionStorage.getItem('buy_now');
    if (buynow) {
      this.buy = JSON.parse(buynow);
      this.totalAmountbuy = this.calculateTotalAmountBuy();
    }
    this.CustomerForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_phone: [null, Validators.required],
      customer_address: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.CustomerForm.valid) {
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);

      const formData = new FormData();
      formData.append('order_date', formattedDate);
      formData.append('order_total', this.totalAmount.toString());
      formData.append('customer_name', this.CustomerForm.get('customer_name')?.value);
      formData.append('customer_phone', this.CustomerForm.get('customer_phone')?.value);
      formData.append('customer_address', this.CustomerForm.get('customer_address')?.value);

      const storedCustomerId = sessionStorage.getItem('customer_id');
      this.customer_id = storedCustomerId !== null ? +storedCustomerId : 0;

      formData.append('customer_id', this.customer_id.toString());

      this.order_detail = this.carts.map(item => {
        return {
          order_details_quantity: item.music_quantity,
          order_details_price: item.music_price,
          music_id: item.music_id
        };
      });

      const orderDetailsJson = JSON.stringify(this.order_detail);
      formData.append('orderDetails', orderDetailsJson);

      this.order.addOrder(formData).subscribe({
        next: (response) => {
          console.log('Order submitted successfully!', response);
          if (response && response.message) {
            console.log(response.message);
          }
          sessionStorage.removeItem('carts');
          this.route.navigate(['/payment/message'])
        },
        error: (error) => {
          console.log('Error submitting order:', error);
        },
        complete: () => {
          console.log('Order submission request completed');
        }
      });
    }
  }

  buyNow() {
    if (this.CustomerForm.valid) {
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);

      const formData = new FormData();
      formData.append('order_date', formattedDate);
      formData.append('order_total', this.totalAmountbuy.toString());
      formData.append('customer_name', this.CustomerForm.get('customer_name')?.value);
      formData.append('customer_phone', this.CustomerForm.get('customer_phone')?.value);
      formData.append('customer_address', this.CustomerForm.get('customer_address')?.value);

      this.order_detail = this.buy.map(item => {
        return {
          order_details_quantity: item.music_quantity,
          order_details_price: item.music_price,
          music_id: item.music_id
        };
      });

      const orderDetailsJson = JSON.stringify(this.order_detail);
      formData.append('orderDetails', orderDetailsJson);

      this.order.addOrderBuyNow(formData).subscribe({
        next: (response) => {
          console.log('Order submitted successfully!', response);
          if (response?.message && response?.order_id) {
            console.log(response.message);
            this.route.navigate(['/payment/message'], { queryParams: { order_id: response.order_id } });
          } else {
            this.route.navigate(['/payment/message']);
          }
        },
        error: (error) => {
          console.log('Error submitting order:', error);
        },
        complete: () => {
          console.log('Order submission request completed');
        }
      });
    }
  }

  private formatDate(date: Date): string {
    return date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0') + 'T' +
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0') + ':' +
      String(date.getSeconds()).padStart(2, '0');
  }


}
