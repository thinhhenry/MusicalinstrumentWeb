import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccountDTO {
  account_id: number;
  username: string;
  password: string;
  role: string;
  create_at: string;
  customer_id: number;
}

export interface UserAccount {
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  account_id: number;

  username: string;
  password: string;
  create_at: string;
  role: string;
}

export interface AdminAccount {
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  account_id: number;

  username: string;
  password: string;
  create_at: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL = 'http://localhost:8080/account';

  constructor(private httpClient: HttpClient) { }

  checkLogin(username: string, password: string): Observable<AccountDTO> {
    const body = { username, password };
    return this.httpClient.post<AccountDTO>(`${this.baseURL}/checkLogin`, body);
  }

  getUserAccList(): Observable<UserAccount[]> {
    return this.httpClient.get<UserAccount[]>(`${this.baseURL}/getAccountWithUserRole`);
  }

  getAdAccList(): Observable<AdminAccount[]> {
    return this.httpClient.get<AdminAccount[]>(`${this.baseURL}/getAccountWithAdRole`);
  }

  updateAdRole(accountId: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; 
    return this.httpClient.put<any>(`${this.baseURL}/${accountId}/ad-role`, null, { headers });
  }

  updateUsRole(accountId: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; 
    return this.httpClient.put<any>(`${this.baseURL}/${accountId}/us-role`, null, { headers });
  }

  searchAccByName(username: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/search`, { params: { userName: username } });
  }

  addAccount(accountData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/add`, accountData);
  }

}
