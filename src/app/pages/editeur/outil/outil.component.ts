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
  couleur: RGB = new RGB(0, 0, 0);

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  outilActuel: Outil = Outil.Crayon;

  actionsParOutil = {
    [Outil.Crayon]: (grille: GrilleComponent) => this.actionCrayon(grille),
    [Outil.Gomme]: (grille: GrilleComponent) => this.actionGomme(grille),
    [Outil.Selection]: (grille: GrilleComponent) => this.actionSelection(grille),
    [Outil.Remplissage]: (grille: GrilleComponent) => this.actionRemplissage(grille),
    [Outil.Pipette]: (grille: GrilleComponent) => this.actionPipette(grille),
    [Outil.Baguette]: (grille: GrilleComponent) => this.actionBaguette(grille),
    [Outil.Formes]: (grille: GrilleComponent) => this.actionFormes(grille),
  };

  action(grille: GrilleComponent | undefined) {
    console.log("action");
    this.actionsParOutil[this.outilActuel](grille!);
  }

  constructor() { }

  ngAfterViewInit(): void {
    console.log("Canvas : " + this.canvasHue?.nativeElement);
    this.drawHue();
    this.canvasHue?.nativeElement.addEventListener('mousedown', (e) => { this.pickHue(e); });
  }

  drawSaturation() {
    console.log("drawSaturation");
  }

  drawHue(): void {
    console.log("drawHue");
    if (this.canvasHue) {
      this.hueCtx = this.canvasHue.nativeElement.getContext('2d', { willReadFrequently: true });
      console.log("hueCtx : " + this.hueCtx);
      if (this.hueCtx) {
        const gradient = this.hueCtx.createLinearGradient(0, 0, 0, this.canvasHue.nativeElement.height);
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.15, 'rgb(255, 0, 255)');
        gradient.addColorStop(0.33, 'rgb(0, 0, 255)');
        gradient.addColorStop(0.49, 'rgb(0, 255, 255)');
        gradient.addColorStop(0.67, 'rgb(0, 255, 0)');
        gradient.addColorStop(0.84, 'rgb(255, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');
        this.hueCtx.fillStyle = gradient;
        this.hueCtx.fillRect(0, 0, this.canvasHue.nativeElement.width, this.canvasHue.nativeElement.height);

      }
    }
  }

  pickHue(e: MouseEvent): void {
    const mousePos = this.getMousePos(this.canvasHue?.nativeElement, e);
    console.log("mousePos : " + mousePos.x + " " + mousePos.y);
    const imageData = this.hueCtx?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    if (imageData) {
      console.log("ImageData : " + imageData);
      this.hue = new RGB(imageData[0], imageData[1], imageData[2]);
    }
  }

  getMousePos(canvas: HTMLCanvasElement | undefined, e: MouseEvent): {x: number, y: number} {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    return {x: 0, y: 0};
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

  actionCrayon(grille: GrilleComponent) {
    console.log("actionCrayon");
  }

  actionGomme(grille: GrilleComponent) {
    console.log("actionGomme");
  }

  actionSelection(grille: GrilleComponent) {
    console.log("actionSelection");
  }

  actionRemplissage(grille: GrilleComponent) {
    console.log("actionRemplissage");
  }

  actionPipette(grille: GrilleComponent) {
    console.log("actionPipette");
  }

  actionBaguette(grille: GrilleComponent) {
    console.log("actionBaguette");
  }

  actionFormes(grille: GrilleComponent) {
    console.log("actionFormes");
  }
}
