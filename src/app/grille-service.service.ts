import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrilleService {
  private grilleSource = new Subject<void>();
  grille$ = this.grilleSource.asObservable();

  private saveSource = new BehaviorSubject<boolean>(false);
  save$ = this.saveSource.asObservable();

  triggerGrille() {
    this.grilleSource.next();
  }

  triggerSave(close: boolean = false) {
    this.saveSource.next(close);
  }
}
