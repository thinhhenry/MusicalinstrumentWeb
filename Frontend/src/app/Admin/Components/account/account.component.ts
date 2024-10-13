import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { AccountService, UserAccount, AdminAccount } from '../../../Service/AccountService/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  role: string | null = '';

  activeTab: string = 'user';
  changeTab(tab: string) {
    this.activeTab = tab;
  }

  UserList: UserAccount[] = []
  AdList: AdminAccount[] = []

  constructor(
    private accS: AccountService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUserList()
    this.loadAdList()
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      this.role = storedRole;
    }
  }

  loadAdList(){
    this.accS.getAdAccList().subscribe(data => {
      this.AdList = data.sort((a, b) => a.account_id - b.account_id);
    })
  }

  loadUserList(){
    this.accS.getUserAccList().subscribe(data => {
      this.UserList = data.sort((a, b) => a.account_id - b.account_id);
    })
  }

  updateAdRole(accountId: number, username: string) {
    if (confirm('Chỉ định ' + username + ' làm quản trị viên?')) {
      this.accS.updateAdRole(accountId).subscribe({
        next: () => {
          this.toast.success('Đã chỉ định ' + username + ' làm quản trị viên','Thành công')
          this.loadUserList()
          this.loadAdList()
        },
        error: (error) => {
          console.error('Error fetching category count', error);
        }
      });
    }
  }

  updateUsRole(accountId: number, username: string) {
    if (confirm('Xóa quyền quản trị viên của ' + username + '?')) {
      this.accS.updateUsRole(accountId).subscribe({
        next: () => {
          this.toast.success('Đã xóa quyền quản trị viên của ' + username,'Thành công')
          this.loadUserList()
          this.loadAdList()
        },
        error: (error) => {
          console.error('Error fetching category count', error);
        }
      });
    }
  }
}
