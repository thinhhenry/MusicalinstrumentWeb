import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Customer } from '../../../Service/CustomerService/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  CustomerList: Customer[] = []

  constructor(
    private customerS: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerS.getCustomerList().subscribe(data => {
      this.CustomerList = data.sort((a, b) => a.customer_id - b.customer_id);
    })
  }
}
