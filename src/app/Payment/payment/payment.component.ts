import { Component, OnInit } from '@angular/core';
import { StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  courses = [
    { id: 1, name: 'Course 1', price: 100 },
    { id: 2, name: 'Course 2', price: 200 },
    // Add more courses as needed
  ];

  elements!: StripeElements; // Declare elements property
  cardElement!: StripeCardElement; // Declare cardElement property

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    const stripe = await this.paymentService.getStripeInstance();
    this.elements = stripe.elements(); 
    this.cardElement = this.elements.create('card'); 
    this.cardElement.mount('#card-element'); 
  }

  async buyNow(course: any) {
    this.paymentService.createPaymentIntent(course.price).subscribe(async (response: any) => {
      const clientSecret = response.clientSecret;
      const { paymentIntent, error } = await this.paymentService.handlePayment(clientSecret, this.cardElement);
      if (error) {
        console.error('Payment failed:', error);
      } else {
        this.paymentService.storePayment(course.id, course.price).subscribe(res => {
          console.log('Payment recorded successfully', res);
        });
      }
    });
  }
}
