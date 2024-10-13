import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Order_Detail {
  order_details_quantity: number;
  order_details_price: number;
  music_id: number;
}
export interface Order {
  order_id: number;

  order_date: string;
  order_status: number;
  order_total: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_id: number;
}
export interface OrderDetailDTO {
  orderId: number;
  orderDate: string;
  orderStatus: number;
  orderTotal: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;

  orderDetailsId: number;
  orderDetailsQuantity: number;
  orderDetailsPrice: number;
  totalPrice: number;
  musicName: string;
  musicImg: string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL = 'http://localhost:8080/order';

  constructor(private httpClient: HttpClient) { }

  getOrderList(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseURL}/getAll`);
  }

  addOrder(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/add`, formData);
  }

  addOrderBuyNow(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/add-without-us`, formData);
  }

  getOrderDetails(orderId: number): Observable<OrderDetailDTO[]> {
    return this.httpClient.get<OrderDetailDTO[]>(`http://localhost:8080/orderDetail/${orderId}/details`);
  }

  updateOrderStatus(orderId: number, orderStatus: number): Observable<any> {
    return this.httpClient.put<any>(`${this.baseURL}/${orderId}/status`, null, {
      params: { order_status: orderStatus }
    });
  }

  searchOrder(query: number) {

    if (query) {
      return this.httpClient.get<OrderDetailDTO[]>(`${this.baseURL}/search?orderId=${query}`);
    }

    return of([]);
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseURL}/by-customer?customerId=${customerId}`);
  }

  getMonthlyRevenue(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/revenue`);
  }

  getOrderCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }

  getCurrentMonthRevenue(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/revenue-current-month`);
  }
}
