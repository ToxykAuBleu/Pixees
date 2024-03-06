import { Component, ViewChild, OnInit } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [CalqueComponent, GrilleComponent, OutilComponent],
  templateUrl: './editeur.component.html',
  styleUrl: './editeur.component.scss'
})

export class EditeurComponent implements OnInit {
  @ViewChild('calque', { static: true }) calque: CalqueComponent | undefined;
  @ViewChild('grille', { static: true }) grille: GrilleComponent | undefined;
  @ViewChild('outil', { static: true }) outil: OutilComponent | undefined;

  hauteur: number = 0;
  largeur: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()?.extras.state;
    if (navigation) {
      const data = JSON.parse(navigation['data']).project;
      this.hauteur = data.taille.hauteur;
      this.largeur = data.taille.largeur;
    }
  }

  ngOnInit(): void { }

  onGrilleClicked($event: { x: number; y: number; }) {
    // Effectuez l'action de l'outil actuel
    this.outil?.action(this.grille, $event.x, $event.y);
  }
}
