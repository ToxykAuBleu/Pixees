import { Inject, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy } from '@fortawesome/free-solid-svg-icons';
import { GrilleComponent } from '../grille/grille.component';

@Component({
  selector: 'app-calque',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './calque.component.html',
  styleUrl: './calque.component.scss'
})
export class CalqueComponent extends GrilleComponent {
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;

  private _position: number;
  private _nom: string;

  constructor(@Inject(Number) private position: number, @Inject(String) private nom: string) {
    super();
    this._position = position;
    this._nom = nom;
  }

  getPosition(): number {
    return this._position;
  }

  getNom(): string {
    return this._nom;
  }

  setPosition(position: number): void {
    this._position = position;
  }

  setNom(nom: string): void {
    this._nom = nom;
  }
}
