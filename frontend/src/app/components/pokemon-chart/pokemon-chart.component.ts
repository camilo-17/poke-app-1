import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
    selector: 'app-pokemon-chart',
    templateUrl: './pokemon-chart.component.html',
})
export class PokemonChartComponent implements OnInit {
    @Input() pokemon: any;

    public radarChartData: ChartConfiguration<'radar'>['data'] = {
        labels: ['HP', 'Attack Damage', 'Weakness', 'Resistance', 'Retreat Cost'],
        datasets: [],
    };

    public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
        responsive: true,
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 150,
            },
        },
    };

    constructor() {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        const hp = this.pokemon.hp ? parseInt(this.pokemon.hp, 10) : 0;
        const attackDamage = this.pokemon.attacks && this.pokemon.attacks.length > 0 ? parseInt(this.pokemon.attacks[0].damage, 10) : 0;
        const weaknessValue = this.pokemon.weaknesses && this.pokemon.weaknesses.length > 0 ? parseInt(this.pokemon.weaknesses[0].value.replace('+', ''), 10) : 0;
        const resistanceValue = this.pokemon.resistances && this.pokemon.resistances.length > 0 ? parseInt(this.pokemon.resistances[0].value.replace('-', ''), 10) : 0;
        const retreatCost = this.pokemon.retreatCost ? this.pokemon.retreatCost.length * 10 : 0;

        this.radarChartData.datasets = [
            {
                label: this.pokemon.name,
                data: [hp, attackDamage, weaknessValue, resistanceValue, retreatCost],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
        ];
    }
}
