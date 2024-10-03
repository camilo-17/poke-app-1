import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
    paymentStatus: string = 'Verifying...';
    paymentIntentId: string | null = null;
    paymentSuccess: boolean = false;

    constructor(private route: ActivatedRoute, private api: ApiService) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.paymentIntentId = params['payment_intent'];

            if (this.paymentIntentId) {
                this.verifyPayment(this.paymentIntentId);
            } else {
                this.paymentStatus = 'No Payment Intent found';
            }
        });
    }

    isPaymentSuccessful(): boolean {
        return this.paymentSuccess;
    }

    async verifyPayment(paymentIntentId: string) {
        try {
            const response = await firstValueFrom(this.api.confimPayment(paymentIntentId));
            if (response.success) {
                this.paymentSuccess = true;
                this.paymentStatus = 'Payment successful! Thank you for your purchase.';
            } else {
                this.paymentSuccess = false;
                this.paymentStatus = 'Payment failed. Please try again.';
            }
        } catch (error) {
            this.paymentSuccess = false;
            this.paymentStatus = 'Error verifying payment. Please contact support.';
            console.error('Error:', error);
        }
    }
}
