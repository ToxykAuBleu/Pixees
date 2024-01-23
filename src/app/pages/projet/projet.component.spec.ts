import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetComponent } from './projet.component';

describe('ProjetComponent', () => {
  let component: ProjetComponent;
  let fixture: ComponentFixture<ProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
