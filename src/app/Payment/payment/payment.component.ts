import { Component, OnInit } from '@angular/core';
import { Stripe, StripeCardElement, StripeElements, loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { ToastrService } from 'ngx-toastr';
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
  error: string | undefined = '';
  id: any;
  isloading: boolean = false;

  constructor(private paymentService: PaymentService, private router: Router, private activatedRoute: ActivatedRoute,private notificationService: NotificationsService,private toaster: ToastrService) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    const stripeInstance = await loadStripe('pk_test_51Q4p29HHlb6JyFN5NOmqDxMMfS65GHSLV8I9JDI7B8V74zIIeQRgyPJjC9qFP4iefByjoM70ZYw6zDHQSz8TX3UP000aCFgAl8');

    if (stripeInstance) {
      this.stripe = stripeInstance;
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    } else {
      this.error = '';
    }
  }
  pay() {
    this.error = '';
    this.message = '';
    const courseId = this.id;
    this.isloading = true;
    this.paymentService.createPaymentIntent(courseId).subscribe({
      next: async (response: any) => {
        const clientSecret = response.clientSecret;
        const { paymentIntent, error } = await this.paymentService.confirmPayment(clientSecret, this.cardElement, this.stripe);
        if (error) {
          this.error = "payment error";
          this.toaster.error('Payment Failed');
          this.isloading = false;
        } else if (paymentIntent?.status === 'succeeded') {
          this.isloading = false;
          this.paymentService.storePaymentIntent(paymentIntent, courseId).subscribe({
            next: () => {
              this.message = 'payment successful';
              this.notificationService.refresh();
              this.router.navigate(['/course', courseId]);
              this.toaster.success('Payment Successful', 'Course Purchased');
            },
            error: () =>{ this.error = 'payment error'
              this.toaster.error('Course Purchase Failed');
            }
          });
        } else {
          this.error = 'payment error';
        }
      },
      error: () => this.error = 'payment error'
    });
  }
}
