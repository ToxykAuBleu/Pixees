import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { RGB } from '../../../../Algo/scripts/color/RGB'
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


  @ViewChild('gridCanvas', { static: false }) gridCanvas: ElementRef<HTMLCanvasElement> | undefined;
  gridCtx: CanvasRenderingContext2D | null | undefined;

  grille: Grille | undefined;
  mouseDown: boolean = false;

  private subscription: Subscription | undefined;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private grilleService: GrilleService) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this.isBrowser = true;
    console.log("platformId : " + platformId);
    console.log("isBrowser : " + this.isBrowser);
  }

  ngOnInit(): void {
    this.subscription = this.grilleService.grille$.subscribe(() => {
      this.exportAsPNG();
    });

    this.grilleService.save$.subscribe(() => {
      this.saveAsJSON();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.gridCtx = this.gridCanvas?.nativeElement.getContext('2d');
    // Récupération de la hauteur et de la largeur du canvas
    this.grille = this.drawGrid(128, 128);

    this.canvas?.nativeElement.addEventListener('mousedown', (e) => {
      let { x, y } = this.getMousePos(this.canvas!.nativeElement, e);
      this.onGrilleClick(x, y);
      this.mouseDown = !this.mouseDown;
    });

    this.canvas?.nativeElement.addEventListener('mousemove', (e) => {
      if(this.mouseDown) {
        let { x, y } = this.getMousePos(this.canvas!.nativeElement, e);
        this.onGrilleClick(x, y);
      }
    });
    
    this.canvas?.nativeElement.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.grille?.canvasToGrid(this.ctx);
      }
    });

    this.canvas?.nativeElement.addEventListener('mouseleave', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.grille?.canvasToGrid(this.ctx);
      }
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
    this.grilleClicked.emit({ x, y })
  }

  // Création du pattern
  drawPattern(): HTMLCanvasElement | undefined {
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
    const grille = new Grille(hauteur, largeur);

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

  // Dessiner
  draw(x: number, y: number, rayon: number, couleur: RGB): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgba(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)}, ${couleur.getAlpha()})`;
    if (rayon == 1) {
      this.ctx.fillRect(x, y, rayon, rayon);
    } else {
      this.ctx.beginPath();
      this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
      this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    // this.grille?.canvasToGrid(this.ctx);
  }

  // Effacer
  clear(x: number, y: number, rayon: number): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgb(0,0,0,0)`;
    if (rayon == 1) {
      this.ctx.fillRect(x, y, rayon, rayon);
    } else {
      this.ctx.beginPath();
      this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
      this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
      this.ctx.save();
      this.ctx.clip();
      this.ctx.clearRect(x - rayon, y - rayon, rayon * 2, rayon * 2);
      this.ctx.restore();
    }
  }

  pickColor(x: number, y: number): Couleur {
    if (!this.ctx) {
      return new RGB(0, 0, 0, 0);
    }
    const data = this.ctx.getImageData(x, y, 1, 1).data;
    return new RGB(data[0], data[1], data[2], data[3]/255);
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

  saveAsJSON(): void {
    console.log("saveAsJSON");
  }
}
