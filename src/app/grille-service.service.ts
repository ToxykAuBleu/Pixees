import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrilleService {
  private grilleSource = new Subject<void>();
  grille$ = this.grilleSource.asObservable();

  triggerGrille() {
    this.grilleSource.next();
  }
}
