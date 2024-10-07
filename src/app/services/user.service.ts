import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/api/students';  
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
  getUser(id: number) {
    return this.http.get(this.url + '/' + id);

}
  updateUser(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data);
  }
  getUsers() {
    return this.http.get(this.url);
  }

}
