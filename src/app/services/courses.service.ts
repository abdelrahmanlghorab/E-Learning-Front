import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://localhost:8000/api/courses';
  searchUrl = 'http://localhost:8000/api/search';
  constructor(private http: HttpClient) { }
   getCourse(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  createCourse(data: any) {
    return this.http.post(this.url, data);
  }
  updateCourse(id:number, data:any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  deleteCourse(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  searchCourses(keyword: string) {
    return this.http.get(`${this.searchUrl}?keyword=${keyword}`);
  }
  getAllCourses(categoryId?: string, sortOrder: string = 'asc'): Observable<any> {
    let params = new HttpParams().set('sort_order', sortOrder);
    if (categoryId) {
      params = params.set('category_id', categoryId);
    }
    return this.http.get<any>(this.url, { params });
  }
}
