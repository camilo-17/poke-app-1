import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './pages/payment/payment.component';
import { PokemonCardsComponent } from './pages/pokemon-cards/pokemon-cards.component';

const routes: Routes = [
    { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: PokemonCardsComponent },
    { path: 'payment', component: PaymentComponent },
    { path: '**', redirectTo: '/pokemons' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
