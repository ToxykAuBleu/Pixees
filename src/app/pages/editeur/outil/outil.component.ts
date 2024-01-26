import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faEraser, faVectorSquare, faFillDrip, faEyeDropper, faWandMagic, faShapes } from '@fortawesome/free-solid-svg-icons';
import { RGB } from '../../../../Algo/scripts/color/RGB';
import { GrilleComponent } from '../grille/grille.component';
import { Grille } from '../../../../Algo/scripts/Grille';

enum Outil {
  Crayon,
  Gomme,
  Selection,
  Remplissage,
  Pipette,
  Baguette,
  Formes
}

@Component({
  selector: 'app-outil',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './outil.component.html',
  styleUrl: './outil.component.scss'
})

export class OutilComponent implements AfterViewInit{
  @ViewChild('hueCanvas', { static: false }) canvasHue: ElementRef<HTMLCanvasElement> | undefined;
  hueCtx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('saturationCanvas', { static: false }) canvasSaturation: ElementRef<HTMLCanvasElement> | undefined;
  saturationCtx: CanvasRenderingContext2D | null | undefined;

  hue: RGB = new RGB(0, 0, 0);
  couleur: RGB = new RGB(0, 255, 0);

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  outilActuel: Outil = Outil.Crayon;

  actionsParOutil = {
    [Outil.Crayon]: (grille: GrilleComponent, x: number , y: number) => this.actionCrayon(grille, x, y),
    [Outil.Gomme]: (grille: GrilleComponent, x: number , y: number) => this.actionGomme(grille, x, y),
    [Outil.Selection]: (grille: GrilleComponent, x: number , y: number) => this.actionSelection(grille, x, y),
    [Outil.Remplissage]: (grille: GrilleComponent, x: number , y: number) => this.actionRemplissage(grille, x, y),
    [Outil.Pipette]: (grille: GrilleComponent, x: number , y: number) => this.actionPipette(grille, x, y),
    [Outil.Baguette]: (grille: GrilleComponent, x: number , y: number) => this.actionBaguette(grille, x, y),
    [Outil.Formes]: (grille: GrilleComponent, x: number , y: number) => this.actionFormes(grille, x, y),
  };

  action(grille: GrilleComponent | undefined, x: number, y: number) {
    console.log("action");
    this.actionsParOutil[this.outilActuel](grille!, x, y);
  }

  constructor() { }

  ngAfterViewInit(): void {
    console.log("Canvas : " + this.canvasHue?.nativeElement);
  }

  crayon() {
    this.outilActuel = Outil.Crayon;
    console.log("Crayon selected");
  }

  gomme() {
    this.outilActuel = Outil.Gomme;
    console.log("Gomme selected");
  }

  selection() {
    this.outilActuel = Outil.Selection;
    console.log("Selection selected");
  }

  remplissage() {
    this.outilActuel = Outil.Remplissage;
    console.log("Remplissage selected");
  }

  pipette() {
    this.outilActuel = Outil.Pipette;
    console.log("Pipette selected");
  }

  baguette() {
    this.outilActuel = Outil.Baguette;
    console.log("Baguette selected");
  }

  formes() {
    this.outilActuel = Outil.Formes;
    console.log("Formes selected");
  }

  actionCrayon(grille: GrilleComponent, x: number, y: number) {
    grille.drawRect(x, y, 10, 10, this.couleur);
  }

  actionGomme(grille: GrilleComponent, x: number, y: number) {
    console.log("actionGomme");
  }

  actionSelection(grille: GrilleComponent, x: number, y: number) {
    console.log("actionSelection");
  }

  actionRemplissage(grille: GrilleComponent, x: number, y: number) {
    console.log("actionRemplissage");
  }

  actionPipette(grille: GrilleComponent, x: number, y: number) {
    console.log("actionPipette");
  }

  actionBaguette(grille: GrilleComponent, x: number, y: number) {
    console.log("actionBaguette");
  }

  actionFormes(grille: GrilleComponent, x: number, y: number) {
    console.log("actionFormes");
  }
}
