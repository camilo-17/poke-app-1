import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, NgbPaginationModule, HttpClientModule, ReactiveFormsModule, FormsModule],
    providers: [provideClientHydration()],
    bootstrap: [AppComponent],
})
export class AppModule {}
