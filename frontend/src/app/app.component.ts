import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { firstValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(private apiService: ApiService, private modalService: NgbModal) {}
    title = 'Pokemon Trading Card Info';
    pokemons: any[] = [];
    searchTerm: string = '';
    filteredPokemons: any[] = [];

    async ngOnInit() {
        await this.getPokemons();
    }

    // Mocked API call
    async getPokemons() {
        const cards: any = await firstValueFrom(this.apiService.getPokemons());
        this.pokemons = cards.data;
        this.filteredPokemons = this.pokemons;
    }

    applySearchTerm(): void {
        this.filteredPokemons = this.searchTerm ? this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())) : this.pokemons;
    }

    // Open the modal when a Pokémon is clicked
    openPokemonModal(pokemon: any): void {
        const modalRef = this.modalService.open(PokemonModalComponent, { size: 'lg' });
        modalRef.componentInstance.pokemon = pokemon; // Pass the selected Pokémon data to the modal
    }
}
