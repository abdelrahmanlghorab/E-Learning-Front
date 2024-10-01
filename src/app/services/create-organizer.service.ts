import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizerService {

    url='http://127.0.0.1:8000/api/organizar';
  constructor(private http: HttpClient) { }
  getAllCourses() {
    return this.http.get(this.url);
  }
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

}

