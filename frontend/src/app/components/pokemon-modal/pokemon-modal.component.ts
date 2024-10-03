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
        this.activeModal.close(1);
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
}
