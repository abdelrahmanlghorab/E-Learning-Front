import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-mangement',
  standalone: true,
  imports: [],
  templateUrl: './payment-mangement.component.html',
  styleUrl: './payment-mangement.component.css'
})
export class PaymentMangementComponent {
  payments: any;
constructor(private paymentService: PaymentService) {}
ngOnInit(): void {
  this.paymentService.getPayments().subscribe(
    (response) => {
      this.payments = response;
    },
    (error) => {
      console.error('Error fetching payments', error);
    }
  );
}
}
