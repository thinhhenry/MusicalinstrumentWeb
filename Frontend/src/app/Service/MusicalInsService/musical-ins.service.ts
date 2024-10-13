import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../CategoryService/category.service';

export interface MusicalIns {
  music_id: number;
  music_name: string;
  music_img: string;
  music_price: number;
  music_quantity: number;
  music_category_id: number;
}

export interface CategoryWithMusicalIns {
  category: Category;
  instruments: MusicalIns[];
}

@Injectable({
  providedIn: 'root'
})
export class MusicalInsService {

  private baseURL = 'http://localhost:8080/music';

  constructor(private httpClient: HttpClient) { }

  //Lấy 2 bảng category và music
  getMusicalInsList(): Observable<CategoryWithMusicalIns[]> {
    return this.httpClient.get<CategoryWithMusicalIns[]>(`${this.baseURL}/getAll`);
  }

  getMusicalById(id: number): Observable<MusicalIns> {
    return this.httpClient.get<MusicalIns>(`${this.baseURL}/getById/${id}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/add`, formData, {
    });
  }

  deleteProduct(id: number): Observable<MusicalIns> {
    return this.httpClient.delete<MusicalIns>(`${this.baseURL}/delete/${id}`);
  }

  searchMusical(query: string) {

    if (query && query.trim().length > 0) {
      return this.httpClient.get<CategoryWithMusicalIns[]>(`${this.baseURL}/search?musicName=${query}`);
    }

    return of([]);
  }

  getMusicCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }

  checkStock(music_id: number, requestedQuantity: number) {
    return this.httpClient.get<string>(`${this.baseURL}/check-stock/${music_id}/${requestedQuantity}`);
  }

}
