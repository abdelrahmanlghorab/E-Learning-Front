import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/api/students';  
  constructor(private http: HttpClient) { }

  getAllStudent() {
    return this.http.get(this.url);
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  updateUser(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data);
  }

  removeStudent(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  restoreStudent(id: number) {
    return this.http.put(`${this.url}/restore/${id}`, {});  
  }
}
