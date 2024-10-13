import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  order_id: string | null = null;
  check: boolean = false

  constructor(private route: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.order_id = params['order_id'] || null;
  
      if (this.order_id) {
        this.check = true;
      } else {
        this.check = false;
      }
    });
  }

  copyToClipboard() {
    if (this.order_id) {
      navigator.clipboard.writeText(this.order_id).then(() => {
        console.log('Order ID copied to clipboard');
        this.toast.success('Đã sao chép mã vận đơn.','Thành công')
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    }
  }
}
