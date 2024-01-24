import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faEraser, faVectorSquare, faFillDrip, faEyeDropper, faWandMagic, faShapes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-outil',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './outil.component.html',
  styleUrl: './outil.component.scss'
})
export class OutilComponent {
  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;
  constructor() { }

  crayon() {
    console.log('crayon');
  }

  gomme() {
    console.log('gomme');
  }

  selection() {
    console.log('selection');
  }

  remplissage() {
    console.log('remplissage');
  }

  pipette() {
    console.log('pipette');
  }

  baguette() {
    console.log('baguette');
  }

  formes() {
    console.log('formes');
  }
}
