import { Component, OnInit } from '@angular/core';
import { Stripe, StripeCardElement,StripeElements,loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  standalone: true,
  imports: [RouterLink]
})
export class PaymentComponent implements OnInit {
  private stripe!: Stripe;
  private cardElement!: StripeCardElement;
  private elements!: StripeElements;
  message: string | undefined = '';
  id:any;

  constructor(private paymentService: PaymentService, router: Router, private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

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
    const courseId = this.id;
    console.log(courseId);
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
