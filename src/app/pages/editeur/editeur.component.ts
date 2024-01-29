import { Component } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [CalqueComponent, GrilleComponent, OutilComponent],
  templateUrl: './editeur.component.html',
  styleUrl: './editeur.component.scss'
})
export class EditeurComponent {

}
