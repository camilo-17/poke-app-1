import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginClient, ExtensionClient } from '@authress/login';

import { loadStripe } from '@stripe/stripe-js';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { PaymentModalComponent } from '../../components/payment-modal/payment-modal.component';
import { PokemonModalComponent } from '../../components/pokemon-modal/pokemon-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './pokemon-cards.component.html',
    styleUrls: ['./pokemon-cards.component.css'],
})
export class PokemonCardsComponent implements OnInit {
    constructor(private apiService: ApiService, private modalService: NgbModal, private authService: AuthService) {}
    pokemons: any[] = [];
    searchTerm: string = '';
    filteredPokemons: any[] = [];
    loginClient: any;
    showLoading = true;

    async ngOnInit() {
        this.loginClient = new LoginClient({ authressApiUrl: environment.authApiUrl, applicationId: environment.authAppId });
        await this.login();
    }

    async login() {
        const isUserLoggedIn = await this.loginClient.userSessionExists();
        if (!isUserLoggedIn) {
            await this.loginClient.authenticate({
                redirectUrl: window.location.href,
            });
        }
        const token = await this.loginClient.ensureToken();
        console.log(token);

        this.authService.setToken(token);
        await this.getPokemons();
    }

    // Mocked API call
    async getPokemons() {
        const cards: any = await firstValueFrom(this.apiService.getPokemons());
        this.pokemons = cards.data;
        this.filteredPokemons = this.pokemons;
        this.showLoading = false;
    }

    async logOut() {
        await this.loginClient.logout();
    }

    applySearchTerm(): void {
        this.filteredPokemons = this.searchTerm ? this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())) : this.pokemons;
    }

    openPokemonModal(pokemon: any): void {
        const modalRef = this.modalService.open(PokemonModalComponent, { size: 'lg' });
        modalRef.componentInstance.pokemon = pokemon;
        modalRef.result.then((result) => {
            if (result === 1) {
                this.showLoading = true;
                this.openPaymentModal();
            }
        });
    }

    async excObservableAsPromise(promise: Observable<any>) {
        try {
            const res = await firstValueFrom(promise);
            return [res, null];
        } catch (error) {
            return [null, error];
        }
    }

    async openPaymentModal() {
        const [res, error] = await this.excObservableAsPromise(this.apiService.createPaymentIntent(1000, 'usd'));
        if (error) {
            return;
        }
        const stripe = await loadStripe(environment.publicApiStripe);
        this.showLoading = false;
        const modalRef = this.modalService.open(PaymentModalComponent, { size: 'lg' });
        modalRef.componentInstance.clientSecret = res.clientSecret;
        modalRef.componentInstance.stripe = stripe;
        modalRef.result.then(async (result) => {
            if (result && stripe !== null) {
                this.showLoading = true;
                const { error } = await stripe.confirmPayment({
                    elements: result,
                    clientSecret: res.clientSecret,
                    confirmParams: {
                        return_url: window.location.origin + '/payment',
                    },
                });
                this.showLoading = false;

                if (error) {
                    console.error('Payment error:', error.message);
                } else {
                }
            }
        });
    }
}
