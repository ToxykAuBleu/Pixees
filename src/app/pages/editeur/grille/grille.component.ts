import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { Couleur } from '../../../../Algo/scripts/color/Couleur';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit {
  @Output() grilleClicked = new EventEmitter<{ x: number, y: number }>();

  @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('gridCanvas', { static: false }) gridCanvas: ElementRef<HTMLCanvasElement> | undefined;
  gridCtx: CanvasRenderingContext2D | null | undefined;

  grille: Grille | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    console.log("Canvas : " + this.canvas?.nativeElement);
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.gridCtx = this.gridCanvas?.nativeElement.getContext('2d');
    console.log("Context : " + this.ctx);
    // Récupération de la hauteur et de la largeur du canvas
    this.grille = this.drawGrid(128, 128);

    this.canvas?.nativeElement.addEventListener('click', (e) => {
      console.log("Grille clicked");
      const rect = this.canvas!.nativeElement.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      x = Math.floor(this.canvas!.nativeElement.width * x / rect.width);
      y = Math.floor(this.canvas!.nativeElement.height * y / rect.height);
      this.onGrilleClick(x, y);
    });
  }

  onGrilleClick(x: number, y: number) {
    console.log("Grille clicked à émettre");
    this.grilleClicked.emit({ x, y })
  }

  // Création du pattern
  drawPattern(): HTMLCanvasElement | undefined {
    console.log("drawPattern");
    // Création du Canvas pour dessiner le pattern
    const patternCanvas = document.createElement("canvas");
    const patternContext = patternCanvas.getContext("2d");
    // Ajustement de la taille du Canvas
    patternCanvas.width = 2;
    patternCanvas.height = 2;

    if (!patternContext) {
      return;
    }
    // Dessin du pattern : 2x2 pixels, 1 noir, 1 blanc
    patternContext.fillStyle = "#ddd";
    patternContext.fillRect(0, 0, 1, 1);
    patternContext.fillRect(1, 1, 1, 1);

    // Dessin de la bordure
    patternContext.stroke();

    return patternCanvas;
  }

  // Dessin de la grille
  drawGrid(hauteur: number, largeur: number): Grille | undefined {
    console.log("drawGrid");
    const grille = new Grille(hauteur, largeur);
    console.log(grille);
    

    if (!this.gridCtx || !this.gridCanvas) {
      return;
    }

    if (!this.ctx || !this.canvas) {
      return;
    }

    // Ajustement de la taille du Canvas
    this.canvas.nativeElement.width = largeur;
    this.canvas.nativeElement.height = hauteur;

    // Ajustement de la taille du Canvas de la grille
    this.gridCanvas.nativeElement.width = largeur;
    this.gridCanvas.nativeElement.height = hauteur;

    // Création du pattern
    const pattern = this.gridCtx.createPattern(this.drawPattern()!, "repeat");

    // Application du pattern
    this.gridCtx.fillStyle = pattern as CanvasPattern;
    this.gridCtx.fillRect(0, 0, largeur, hauteur);

    return grille;
  }

  // Dessiner un rectangle
  drawRect(x: number, y: number, taille: number, couleur: Couleur): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgb(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)})`;
    if (taille == 1) {
      this.ctx.fillRect(x, y, taille, taille);
    } else {
      this.ctx.beginPath();
      this.ctx.arc(x, y, taille, 0, 2 * Math.PI);
      this.ctx.arc(x, y, taille, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    this.grille?.canvasToGrid(this.ctx);
    console.log(this.grille);
  }

  // Effacer un rectangle
  clearRect(x: number, y: number, largeur: number, hauteur: number): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(x, y, largeur, hauteur);
    console.log("clearRect");
  }
}
