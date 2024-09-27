import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = 'http://localhost:3000'; // URL to your Express API

    constructor(private http: HttpClient) {}

    // Method to fetch paginated Pokémon list with error handling
    getPokemons(limit: number = 20, offset: number = 0): Observable<any> {
        const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

        return this.http.get(`${this.baseUrl}/pokeApi`, { params }).pipe(
            catchError(this.handleError) // Handle errors here
        );
    }

    // Error handling method
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Backend returned an unsuccessful response code
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage); // Return the error message for handling in the component
    }
}
