import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  url = 'http://localhost:8000/api/tests';
  constructor(private http : HttpClient) { }
  allTests() {
    return this.http.get(this.url);
  }
  createTest(data: any) {
    return this.http.post(this.url, data);
  }
  getTest(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  updateTest(id:number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  deleteTest(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }}
