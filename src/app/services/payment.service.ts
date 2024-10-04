import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api';
  private stripePromise = loadStripe('pk_test_51Q4p29HHlb6JyFN5NOmqDxMMfS65GHSLV8I9JDI7B8V74zIIeQRgyPJjC9qFP4iefByjoM70ZYw6zDHQSz8TX3UP000aCFgAl8');

  constructor(private http: HttpClient) {}

  createPaymentIntent(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { course_id: courseId });
  }

  async confirmPayment(clientSecret: string, cardElement: StripeCardElement,stripe?: Stripe) {
    if (!stripe) {
      throw new Error('Stripe.js has not loaded yet.');
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    return { paymentIntent, error };
  }
}
