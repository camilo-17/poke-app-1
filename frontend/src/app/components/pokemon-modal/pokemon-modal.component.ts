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
    quantity: number = 1;
    isNotValid = false;

    constructor(public activeModal: NgbActiveModal) {}

    expandedAbilities: { [key: number]: boolean } = {};

    toggleAbility(index: number): void {
        this.expandedAbilities[index] = !this.expandedAbilities[index];
    }

    getAbilityText(ability: any, index: number): string {
        const fullText = ability.text;
        const isExpanded = this.expandedAbilities[index];
        if (fullText.length > 50 && !isExpanded) {
            return fullText.slice(0, 50) + '...';
        }
        return fullText;
    }

    isAbilityTruncated(ability: any): boolean {
        return ability.text.length > 50;
    }

    ngOnInit(): void {
        this.weaknesses = this.getWeaknesses();
        this.resistances = this.getResistances();
    }

    buy() {
        if (this.quantity < 1) {
            this.isNotValid = true;
            return;
        }
        this.activeModal.close(this.quantity);
    }

    getWeaknesses(): string {
        return this.pokemon.weaknesses ? this.pokemon.weaknesses.map((w: any) => `${w.type} (${w.value})`).join(', ') : 'None';
    }

    getResistances(): string {
        return this.pokemon.resistances ? this.pokemon.resistances.map((r: any) => `${r.type} (${r.value})`).join(', ') : 'None';
    }

    closeModal() {
        this.activeModal.close(0);
    }

    increment() {
        if (this.quantity < 11) {
            this.quantity++;
        }
    }

    decrement() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
