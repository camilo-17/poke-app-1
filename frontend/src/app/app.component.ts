import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'frontend';
    pokemons: any[] = [];
    limit = 20;
    offset = 0;
    errorMessage: string | null = null;

    ngOnInit(): void {
        this.fetchPokemons();
    }
    constructor(private apiService: ApiService) {}

    fetchPokemons(): void {
        this.apiService.getPokemons(this.limit, this.offset).subscribe(
            (data) => {
                this.pokemons = data.pokemons;
                this.errorMessage = null; // Reset error message on success
            },
            (error) => {
                this.errorMessage = error; // Set the error message returned from the service
                console.error('Error fetching Pokémon data:', error);
            }
        );
    }

    nextPage(): void {
        this.offset += this.limit;
        this.fetchPokemons();
    }

    previousPage(): void {
        if (this.offset >= this.limit) {
            this.offset -= this.limit;
            this.fetchPokemons();
        }
    }
}
