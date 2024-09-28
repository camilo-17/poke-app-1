import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    pokemons: any[] = [];
    filteredPokemons: any[] = [];
    searchTerm: string = '';
    errorMessage: string = '';
    offset = 0;
    limit = 20;

    ngOnInit(): void {
        this.fetchPokemons();
    }
    constructor(private apiService: ApiService) {}

    filterPokemons(): void {
        if (this.searchTerm.length > 0) {
            this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        } else {
            this.filteredPokemons = this.pokemons;
        }
    }

    fetchPokemons(): void {
        this.apiService.getPokemons(this.limit, this.offset).subscribe(
            (data) => {
                this.pokemons = data.pokemons;
                this.errorMessage = ''; // Reset error message on success
                this.filterPokemons();
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
