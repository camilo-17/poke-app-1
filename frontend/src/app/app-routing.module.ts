import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './pages/payment/payment.component';
import { PokemonCardsComponent } from './pages/pokemon-cards/pokemon-cards.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
    { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: PokemonCardsComponent, canActivate: [authGuardFn] },
    { path: 'checkout', component: PaymentComponent, canActivate: [authGuardFn] },
    { path: 'report', component: ReportComponent, canActivate: [authGuardFn] },
    { path: '**', redirectTo: '/pokemons' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
