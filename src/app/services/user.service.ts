import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }
  getAllCourses() {
    return this.http.get(this.url);
  }
  getCourse(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  deleteCourse(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
