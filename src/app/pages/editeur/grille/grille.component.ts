import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit {
  @Output() grilleClicked = new EventEmitter<void>();

  onGrilleClick() {
    console.log("Grille clicked à émettre");
    this.grilleClicked.emit();
  }

  @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    //this.isBrowser = isPlatformBrowser(platformId);
    this.isBrowser = true;
    console.log("platformId : " + platformId);
    console.log("isBrowser : " + this.isBrowser);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      console.log("Canvas : " + this.canvas?.nativeElement);
      this.ctx = this.canvas?.nativeElement.getContext('2d');
      console.log("Context : " + this.ctx);
      this.drawGrid(128, 128);
    }
  }

  // Création du pattern
  drawPattern(): HTMLCanvasElement | undefined {
    console.log("drawPattern");
    // Création du Canvas pour dessiner le pattern
    if (this.isBrowser) {
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
    return;
  }

  // Dessin de la grille
  drawGrid(hauteur: number, largeur: number): Grille | undefined{
    console.log("drawGrid");
    const grille = new Grille(hauteur, largeur);

    if (!this.ctx || !this.canvas) {
      return;
    }

    this.canvas.nativeElement.width = largeur;
    this.canvas.nativeElement.height = hauteur;

    // Création du pattern
    const pattern = this.ctx.createPattern(this.drawPattern()!, "repeat");

    // Application du pattern
    this.ctx.fillStyle = pattern as CanvasPattern;
    this.ctx.fillRect(0, 0, hauteur, largeur);

    return grille;
  }
}
