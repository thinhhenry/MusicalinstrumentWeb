import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../Service/OrderService/order.service';
import { CategoryService } from '../../../Service/CategoryService/category.service';
import { MusicalInsService } from '../../../Service/MusicalInsService/musical-ins.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  chart: any
  categoryCount: number = 0
  musicCount: number = 0
  orderCount: number = 0
  Current_revenue: number = 0

  constructor(private orderService: OrderService, private categoryService: CategoryService, private musicalS: MusicalInsService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.orderService.getMonthlyRevenue().subscribe(data => {
      const labels = data.map((item: any) => `Tháng ${item.month}`);
      const revenue = data.map((item: any) => item.totalRevenue);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Doanh thu',
              data: revenue,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Biểu đồ doanh thu theo tháng', 
              font: {
                size: 20 
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
    this.categoryService.getCategoryCount().subscribe({
      next: (count: number) => {
        this.categoryCount = count;
      },
      error: (error) => {
        console.error('Error fetching category count', error);
      }
    });
    this.musicalS.getMusicCount().subscribe({
      next: (count: number) => {
        this.musicCount = count;
      },
      error: (error) => {
        console.error('Error fetching category count', error);
      }
    });
    this.orderService.getOrderCount().subscribe({
      next: (count: number) => {
        this.orderCount = count;
      },
      error: (error) => {
        console.error('Error fetching category count', error);
      }
    });
    this.orderService.getCurrentMonthRevenue().subscribe({
      next: (revenue: number) => {
        this.Current_revenue = revenue;
      },
      error: (error) => {
        console.error('Error fetching category count', error);
      }
    });
  }
}
