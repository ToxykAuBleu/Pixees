import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeurComponent } from './editeur.component';

describe('EditeurComponent', () => {
  let component: EditeurComponent;
  let fixture: ComponentFixture<EditeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
