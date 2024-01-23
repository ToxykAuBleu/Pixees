import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilComponent } from './outil.component';

describe('OutilComponent', () => {
  let component: OutilComponent;
  let fixture: ComponentFixture<OutilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
