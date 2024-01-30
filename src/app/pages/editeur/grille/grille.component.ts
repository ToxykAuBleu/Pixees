import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { Couleur } from '../../../../Algo/scripts/color/Couleur';
import { RGB } from '../../../../Algo/scripts/color/RGB';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit {
  @Output() grilleClicked = new EventEmitter<{ x: number, y: number }>();
  @Output() grilleUp = new EventEmitter<{ x: number, y: number }>();

  @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('gridCanvas', { static: false }) gridCanvas: ElementRef<HTMLCanvasElement> | undefined;
  gridCtx: CanvasRenderingContext2D | null | undefined;

  grille: Grille | undefined;
  mouseDown: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
    console.log("Canvas : " + this.canvas?.nativeElement);
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.gridCtx = this.gridCanvas?.nativeElement.getContext('2d');
    console.log("Context : " + this.ctx);
    // Récupération de la hauteur et de la largeur du canvas
    this.grille = this.drawGrid(128, 128);

    this.canvas?.nativeElement.addEventListener('mousedown', (e) => {
      this.mouseDown = !this.mouseDown;
    });

    this.canvas?.nativeElement.addEventListener('mousemove', (e) => {
      if(this.mouseDown) {
        let { x, y } = this.getMousePos(this.canvas!.nativeElement, e);
        console.log("x : " + x + " y : " + y);
        this.onGrilleClick(x, y);
      }
    });
    
    this.canvas?.nativeElement.addEventListener('mouseup', (e) => {
      this.mouseDown = !this.mouseDown;
    });
  }

  getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(canvas.width * (evt.clientX - rect.left) / rect.width),
      y: Math.floor(canvas.height * (evt.clientY - rect.top) / rect.height)
    };
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
  draw(x: number, y: number, rayon: number, couleur: Couleur): void {
    console.log("draw");
    if (!this.ctx) {
      return;
    }
    this.ctx.fillRect(x, y, rayon, rayon);
    // this.ctx.fillStyle = `rgb(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)})`;
    // if (rayon == 1) {
    //   this.ctx.fillRect(x, y, rayon, rayon);
    // } else {
    //   this.ctx.beginPath();
    //   this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
    //   this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
    //   this.ctx.fill();
    // }
    // this.grille?.canvasToGrid(this.ctx);
  }

  // Effacer un rectangle
  clearRect(x: number, y: number, largeur: number, hauteur: number): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(x, y, largeur, hauteur);
    console.log("clearRect");
  }

  pickColor(x: number, y: number): Couleur {
    if (!this.ctx) {
      return new RGB(0, 0, 0, 0);
    }
    const data = this.ctx.getImageData(x, y, 1, 1).data;
    return new RGB(data[0], data[1], data[2], data[3]/255);
  }
}
