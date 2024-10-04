import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private stripe: any;
  elements!: StripeElements;
  cardElement!: StripeCardElement;

  constructor(private http: HttpClient) {
    this.loadStripe();
  }

  private async loadStripe() {
    this.stripe = await loadStripe('pk_test_51Q3lwBP6OeMy4sSaxyrUwJKwyhETTSOjZB8Lo8DKzQX8wuf3DOsFKnfeJ8Qz2nH8A4kJt79Z4BrW7jpet2g2u0zv000YlJbkm1'); // Replace with your Stripe publishable key
  }
  public getStripeInstance() {
    return this.stripe; 
  }
  createPaymentIntent(amount: number) {
    return this.http.post('http://127.0.0.1:8000/api/make-payment', { amount });
  }
  storePayment(courseId: number, amount: number) {
    return this.http.post('http://127.0.0.1:8000/api/store-payment', {
      user_id: 1, 
      course_id: courseId,
      amount
    });
  }
  async handlePayment(clientSecret: string, cardElement: StripeCardElement) {
    const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    });
    return { paymentIntent, error };
  }
}