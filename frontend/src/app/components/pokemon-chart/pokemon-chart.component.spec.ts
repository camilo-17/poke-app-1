import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonChartComponent } from './pokemon-chart.component';

describe('PokemonChartComponent', () => {
  let component: PokemonChartComponent;
  let fixture: ComponentFixture<PokemonChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
