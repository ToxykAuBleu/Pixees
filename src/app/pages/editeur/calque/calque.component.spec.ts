import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalqueComponent } from './calque.component';

describe('CalqueComponent', () => {
  let component: CalqueComponent;
  let fixture: ComponentFixture<CalqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
