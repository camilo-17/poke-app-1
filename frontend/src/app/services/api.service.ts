import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getPokemons(): Observable<any> {
        return this.http.get(`${this.baseUrl}/pokeApi/cards`).pipe(catchError(this.handleError));
    }

    createPaymentIntent(amount: number, currency: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/payment/create`, {
            amount,
            currency,
        });
    }

    getReport(): Observable<any> {
        return this.http.get(`${this.baseUrl}/report/sales`);
    }

    confimPayment(paymentIntentId: string, salesInfo: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/payment/confirm-payment`, { paymentIntentId, salesInfo });
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage); // Return the error message for handling in the component
    }
}
