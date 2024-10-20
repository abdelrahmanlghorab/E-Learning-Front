import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl ='http://localhost:8000/api/categories';
  constructor(private http:HttpClient) { }
  getAllCategories(): Observable<any[]>  {
    return this.http.get<any[]>(this.apiUrl);
  }
  getCategory(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createCategory(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  updateCategory(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
