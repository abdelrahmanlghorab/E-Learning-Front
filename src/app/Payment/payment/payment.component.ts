import { Component, OnInit } from '@angular/core';
import { Stripe, StripeCardElement,StripeElements,loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  private stripe!: Stripe;
  private cardElement!: StripeCardElement;
  private elements!: StripeElements;
  message: string | undefined = '';

  constructor(private paymentService: PaymentService,) {}

  async ngOnInit() {
    const stripeInstance = await loadStripe('pk_test_51Q4p29HHlb6JyFN5NOmqDxMMfS65GHSLV8I9JDI7B8V74zIIeQRgyPJjC9qFP4iefByjoM70ZYw6zDHQSz8TX3UP000aCFgAl8');

    if (stripeInstance) {
      this.stripe = stripeInstance;
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    } else {
      this.message = 'Failed to initialize Stripe. Please refresh the page.';
    }
  }
  pay() {
    const courseId = 2;
    this.paymentService.createPaymentIntent(courseId).subscribe({
      next: async (response: any) => {
        const clientSecret = response.clientSecret;
        const { paymentIntent, error } = await this.paymentService.confirmPayment(clientSecret, this.cardElement, this.stripe);
  
        if (error) {
          this.message = error.message;
        } else if (paymentIntent?.status === 'succeeded') {
          console.log(paymentIntent);
          this.paymentService.storePaymentIntent(paymentIntent,courseId).subscribe({
            next: () => {
              this.message = 'Payment successful!';
            },
            error: () => this.message = 'Failed to store payment intent.'
          });
          this.message = 'Payment successful!';
        } else {
          this.message = 'Payment failed, please try again.';
        }
      },
      error: () => this.message = 'Failed to create payment intent.'
    });
  }  
}