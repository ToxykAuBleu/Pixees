import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { Couleur } from '../../../../Algo/scripts/color/Couleur';
import { GrilleService } from '../../../grille-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit, OnInit, OnDestroy {
  @Output() grilleClicked = new EventEmitter<{ x: number, y: number }>();

  @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  private subscription: Subscription | undefined;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private grilleService: GrilleService) {
    //this.isBrowser = isPlatformBrowser(platformId);
    this.isBrowser = true;
    console.log("platformId : " + platformId);
    console.log("isBrowser : " + this.isBrowser);
  }

  ngOnInit(): void {
    this.subscription = this.grilleService.grille$.subscribe(() => {
      this.exportAsPNG();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      console.log("Canvas : " + this.canvas?.nativeElement);
      this.ctx = this.canvas?.nativeElement.getContext('2d');
      console.log("Context : " + this.ctx);
      // Récupération de la hauteur et de la largeur du canvas
      this.drawGrid(128, 128);
    }

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
  drawGrid(hauteur: number, largeur: number): Grille | undefined {
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
    this.ctx.fillRect(0, 0, largeur, hauteur);

    return grille;
  }

  // Dessiner un rectangle
  drawRect(x: number, y: number, largeur: number, hauteur: number, couleur: Couleur): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgb(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)})`;
    this.ctx.fillRect(x, y, largeur, hauteur);
    console.log("drawRect");
  }

  exportAsPNG(): void {
    if (!this.canvas) {
      return;
    }
    const dataURL = this.canvas.nativeElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
  }
}
