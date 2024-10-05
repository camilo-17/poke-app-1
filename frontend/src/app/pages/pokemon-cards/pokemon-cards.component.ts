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
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './pokemon-cards.component.html',
    styleUrls: ['./pokemon-cards.component.css'],
})
export class PokemonCardsComponent implements OnInit {
    constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private authService: AuthService, private auth0Service: Auth0Service) {}
    pokemons: any[] = [];
    searchTerm: string = '';
    filteredPokemons: any[] = [];
    loginClient: any;
    showLoading = true;
    pokemonSelected: any = null;
    user: any;

    async ngOnInit() {
        this.loginClient = new LoginClient({ authressApiUrl: environment.authApiUrl, applicationId: environment.authAppId });
        await this.login();
    }

    async login() {
        const isAuthenticated = await firstValueFrom(this.auth0Service.isAuthenticated$);
        if (isAuthenticated) {
            const token = await firstValueFrom(this.auth0Service.getAccessTokenSilently());
            this.authService.setToken(token);
            this.user = await firstValueFrom(this.auth0Service.user$);
            await this.getPokemons();
        } else {
            this.auth0Service.loginWithRedirect();
        }
    }

    async getPokemons() {
        const cards: any = await firstValueFrom(this.apiService.getPokemons());
        this.pokemons = cards.data;
        this.filteredPokemons = this.pokemons;
        this.showLoading = false;
    }

    async logOut() {
        this.auth0Service.logout({ logoutParams: { returnTo: window.location.origin } });
        this.user = null;
    }

    applySearchTerm(): void {
        this.filteredPokemons = this.searchTerm ? this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())) : this.pokemons;
    }

    openPokemonModal(pokemon: any): void {
        this.pokemonSelected = pokemon;
        const modalRef = this.modalService.open(PokemonModalComponent, { size: 'lg' });
        modalRef.componentInstance.pokemon = pokemon;
        modalRef.result.then((quantity) => {
            if (quantity > 0) {
                this.showLoading = true;
                this.openPaymentModal(quantity);
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

    goToSalesReport() {
        this.router.navigate(['/report']);
    }

    async openPaymentModal(quantity: number) {
        const price = this.pokemonSelected?.cardMarket?.prices?.averageSellPrice || 100;
        const [res, error] = await this.excObservableAsPromise(this.apiService.createPaymentIntent(price, 'usd'));
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
                const salesInfo = {
                    pokemonId: this.pokemonSelected.id,
                    userEmail: this.user.email,
                    userName: this.user.name,
                    productName: this.pokemonSelected.name,
                    price: price,
                    quantity: quantity,
                    currency: 'USD',
                    salesDate: new Date(),
                };

                const { error } = await stripe.confirmPayment({
                    elements: result,
                    clientSecret: res.clientSecret,
                    confirmParams: {
                        return_url: window.location.origin + '/checkout?salesInfo=' + btoa(JSON.stringify(salesInfo)),
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
