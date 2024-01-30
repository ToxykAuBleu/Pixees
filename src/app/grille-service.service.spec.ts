import { TestBed } from '@angular/core/testing';

import { GrilleServiceService } from './grille-service.service';

describe('GrilleServiceService', () => {
  let service: GrilleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrilleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
