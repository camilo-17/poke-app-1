import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
})
export class PaymentComponent implements AfterViewInit {
    paymentStatus: string = 'Verifying...';
    paymentIntentId: string | null = null;
    paymentSuccess: boolean = false;

    constructor(private route: ActivatedRoute, private api: ApiService) {}

    ngAfterViewInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            this.paymentIntentId = params['payment_intent'];
            const salesInfo = JSON.parse(atob(params['salesInfo']));

            if (this.paymentIntentId) {
                await this.verifyPayment(this.paymentIntentId, salesInfo);
            } else {
                this.paymentStatus = 'No Payment Intent found';
            }
        });
    }

    isPaymentSuccessful(): boolean {
        return this.paymentSuccess;
    }

    async verifyPayment(paymentIntentId: string, salesInfo: any) {
        try {
            const response = await firstValueFrom(this.api.confimPayment(paymentIntentId, salesInfo));
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
