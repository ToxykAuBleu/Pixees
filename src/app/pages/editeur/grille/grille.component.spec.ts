import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleComponent } from './grille.component';

describe('GrilleComponent', () => {
  let component: GrilleComponent;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
