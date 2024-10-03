import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal.component';
import { PokemonChartComponent } from './components/pokemon-chart/pokemon-chart.component'; // Import ng2-charts
import { BaseChartDirective } from 'ng2-charts';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PokemonCardsComponent } from './pages/pokemon-cards/pokemon-cards.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
    declarations: [AppComponent, PokemonModalComponent, PokemonChartComponent, PaymentModalComponent, LoaderComponent, PaymentComponent, PokemonCardsComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, NgbPaginationModule, HttpClientModule, ReactiveFormsModule, FormsModule, BaseChartDirective, NgbDropdownModule],
    providers: [
        provideClientHydration(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
