import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteComponent } from './compte.component';

describe('CompteComponent', () => {
  let component: CompteComponent;
  let fixture: ComponentFixture<CompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
