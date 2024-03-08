import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
import { Grille } from '../../../../../Algo/scripts/Grille';

export const HAUTEUR = new InjectionToken<number>('hauteur');
export const LARGEUR = new InjectionToken<number>('largeur');

@Component({
  selector: 'app-layer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  providers: [{ provide: HAUTEUR, useValue: 10 }, { provide: LARGEUR, useValue: 10 }],
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.scss'
})
export class LayerComponent {
  nom: string = "";
  position: number = 0;
  grille!: Grille;
  _hauteur: number;
  _largeur: number;

  constructor(@Inject(HAUTEUR) private hauteur: number, @Inject(LARGEUR) largeur: number) {
    console.log(hauteur, largeur);
    this._hauteur = hauteur;
    this._largeur = largeur;
    this.grille = new Grille(this._hauteur, this._largeur);
  }
  
  @Output() delete = new EventEmitter<void>();

  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
  faEye = faEye;

  deleteLayer() {
    this.delete.emit();
  }
}
