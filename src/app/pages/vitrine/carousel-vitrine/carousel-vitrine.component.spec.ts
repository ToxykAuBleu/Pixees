import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselVitrineComponent } from './carousel-vitrine.component';

describe('CarouselVitrineComponent', () => {
  let component: CarouselVitrineComponent;
  let fixture: ComponentFixture<CarouselVitrineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselVitrineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselVitrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
