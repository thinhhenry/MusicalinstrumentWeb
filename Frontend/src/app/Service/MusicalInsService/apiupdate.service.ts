import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MusicalinsDTO {
  music_id: number;
  music_name: string;
  music_img: string;
  music_price: number;
  music_Picture?: File | null;
  music_quantity: number;
  music_category_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class ApiupdateService {

  private apiUrl = 'http://localhost:8080/music/update';

  constructor(private http: HttpClient) { }

  updateMusical(formData: FormData): Observable<MusicalinsDTO> {
    return this.http.put<MusicalinsDTO>(this.apiUrl, formData);
  }
}
