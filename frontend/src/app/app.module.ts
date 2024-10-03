import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal.component';
import { PokemonChartComponent } from './components/pokemon-chart/pokemon-chart.component'; // Import ng2-charts
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
    declarations: [AppComponent, PokemonModalComponent, PokemonChartComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, NgbPaginationModule, HttpClientModule, ReactiveFormsModule, FormsModule, BaseChartDirective],
    providers: [provideClientHydration()],
    bootstrap: [AppComponent],
})
export class AppModule {}
