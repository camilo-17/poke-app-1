import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pokemon-modal',
    templateUrl: './pokemon-modal.component.html',
})
export class PokemonModalComponent {
    @Input() pokemon: any;
    weaknesses: string = '';
    resistances: string = '';

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {
        this.weaknesses = this.getWeaknesses();
        this.resistances = this.getResistances();
    }

    getWeaknesses(): string {
        return this.pokemon.weaknesses ? this.pokemon.weaknesses.map((w: any) => `${w.type} (${w.value})`).join(', ') : 'None';
    }

    getResistances(): string {
        return this.pokemon.resistances ? this.pokemon.resistances.map((r: any) => `${r.type} (${r.value})`).join(', ') : 'None';
    }

    closeModal() {
        this.activeModal.close();
    }
}
