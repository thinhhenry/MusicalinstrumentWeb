import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer{
  customer_id: number,
  customer_name: string,
  customer_phone: string,
  customer_address: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = 'http://localhost:8080/customer';

  constructor(private httpClient: HttpClient) { }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseURL}/getById/${id}`);
  }

  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}/getCustomerWithoutAcc`);
  }
  
}
