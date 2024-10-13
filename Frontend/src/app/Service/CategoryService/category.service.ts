import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Category{
  category_id: number;
  category_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = 'http://localhost:8080/category';

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseURL}/getAll`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseURL}/getById/${id}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/add`, category);  
  }

  updateCategory(category_id: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.baseURL}/update/${category_id}`, category);
  }  
  
  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.baseURL}/delete/${id}`);
  }  

  searchCategory(query: string) {

    if (query && query.trim().length > 0) {
      return this.httpClient.get<Category[]>(`${this.baseURL}/search?categoryName=${query}`);
    }

    return of([]);
  }

  getCategoryCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }

  checkCategoryExists(categoryName: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/check-category`, {
      params: { categoryName: categoryName }
    });
  }  

}
