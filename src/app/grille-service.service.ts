import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrilleService {
  private grilleSource = new Subject<void>();
  grille$ = this.grilleSource.asObservable();

  private saveSource = new Subject<void>();
  save$ = this.saveSource.asObservable();

  triggerGrille() {
    this.grilleSource.next();
  }

  triggerSave() {
    this.saveSource.next();
  }
}
