import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

@Component({
    selector: 'app-payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrl: './payment-modal.component.css',
})
export class PaymentModalComponent implements OnInit {
    stripe: any;
    card: any;
    clientSecret: string = '';
    elements: any;
    showLoading = false;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.configStripe();
        this.showLoading = true;
    }

    configStripe() {
        const options = {
            layout: {
                type: 'tabs',
                defaultCollapsed: false,
            },
        };
        const elements = this.stripe.elements({ clientSecret: this.clientSecret });
        this.card = elements.create('payment', options);
        this.elements = elements;
        this.card.mount('#card-element');
        this.card.on('ready', (event: any) => {
            this.showLoading = false;
        });
    }

    handlePayment() {
        this.elements.submit().then((result: any) => {
            if (result.error) {
                return;
            } else {
                this.activeModal.close(this.elements);
            }
        });
    }
}
