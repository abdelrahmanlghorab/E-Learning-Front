import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'http://localhost:8000/api/payments';
  constructor(private http: HttpClient) { }
  getPayments() {
    return this.http.get(this.url);
  }
}
