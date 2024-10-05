import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal.component';
import { PokemonChartComponent } from './components/pokemon-chart/pokemon-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PokemonCardsComponent } from './pages/pokemon-cards/pokemon-cards.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReportComponent } from './pages/report/report.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent, PokemonModalComponent, PokemonChartComponent, PaymentModalComponent, LoaderComponent, PaymentComponent, PokemonCardsComponent, ReportComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgbPaginationModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BaseChartDirective,
        NgbDropdownModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(withInterceptors([authHttpInterceptorFn])),
        provideAuth0({
            ...environment.auth0,
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
