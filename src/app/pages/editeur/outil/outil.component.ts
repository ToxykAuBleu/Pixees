import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faEraser, faVectorSquare, faFillDrip, faEyeDropper, faWandMagic, faShapes } from '@fortawesome/free-solid-svg-icons';
import { RGB } from '../../../../Algo/scripts/color/RGB';

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

  hue: RGB = new RGB(255, 0, 0);
  couleur: RGB = new RGB(0, 0, 0);

  colorBuffer: (RGB | null)[] = new Array<RGB | null>(5);

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  constructor() { }

  ngAfterViewInit(): void {
    console.log("Canvas : " + this.canvasHue?.nativeElement);
    this.resizeCanvas();
    this.drawHue();
    this.drawSaturation();
  }

  resizeCanvas(): void {
    if (this.canvasHue) {
      this.canvasHue.nativeElement.width = this.canvasHue.nativeElement.offsetWidth;
      this.canvasHue.nativeElement.height = this.canvasHue.nativeElement.offsetHeight;
    }
    if (this.canvasSaturation) {
      this.canvasSaturation.nativeElement.width = this.canvasSaturation.nativeElement.offsetWidth;
      this.canvasSaturation.nativeElement.height = this.canvasSaturation.nativeElement.offsetHeight;
    }
  }

  drawSaturation(): void {
    if(this.canvasSaturation) {
      // Récupération du contexte du canvas
      this.saturationCtx = this.canvasSaturation.nativeElement.getContext('2d', { willReadFrequently: true });
      if(this.saturationCtx) {
        // Création du dégradé de blanc vers noir
        const blackGradient = this.saturationCtx.createLinearGradient(0, 0, 0, this.canvasSaturation.nativeElement.height);
        blackGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        blackGradient.addColorStop(1, 'rgb(0, 0, 0, 1)');
        
        // Création du dégradé de couleur
        const colorGradient = this.saturationCtx.createLinearGradient(0, 0, this.canvasSaturation.nativeElement.width, 0);
        colorGradient.addColorStop(0, 'rgb(255, 255, 255)');
        colorGradient.addColorStop(1, 'rgb(' + this.hue.getComp(1) + ', ' + this.hue.getComp(2) + ', ' + this.hue.getComp(3) + ')');

        // Dessin du dégradé de saturation
        this.saturationCtx.fillStyle = colorGradient;
        this.saturationCtx.fillRect(0, 0, this.canvasSaturation.nativeElement.width, this.canvasSaturation.nativeElement.height);

        // Dessin du dégradé de noir vers blanc
        this.saturationCtx.fillStyle = blackGradient;
        this.saturationCtx.fillRect(0, 0, this.canvasSaturation.nativeElement.width, this.canvasSaturation.nativeElement.height);
      }
      // Ajout de l'évènement de click sur le canvas
      this.canvasSaturation?.nativeElement.addEventListener('mousedown', (e) => { this.couleur = this.pickColor(e);});
    }
  }
  
  drawHue(): void {
    if (this.canvasHue) {
      // Récupération du contexte du canvas
      this.hueCtx = this.canvasHue.nativeElement.getContext('2d', { willReadFrequently: true });
      if (this.hueCtx) {
        // Création du dégradé de teinte
        const gradient = this.hueCtx.createLinearGradient(0, 0, 0, this.canvasHue.nativeElement.height);
        // Définition des couleurs du dégradé de teinte avec chaques points d'arrêts
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.15, 'rgb(255, 0, 255)');
        gradient.addColorStop(0.33, 'rgb(0, 0, 255)');
        gradient.addColorStop(0.49, 'rgb(0, 255, 255)');
        gradient.addColorStop(0.67, 'rgb(0, 255, 0)');
        gradient.addColorStop(0.84, 'rgb(255, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');
        // Dessin du dégradé de teinte
        this.hueCtx.fillStyle = gradient;
        this.hueCtx.fillRect(0, 0, this.canvasHue.nativeElement.width, this.canvasHue.nativeElement.height);
      }
      // Ajout de l'évènement de click sur le canvas
      this.canvasHue?.nativeElement.addEventListener('mousedown', (e) => { this.pickHue(e); this.drawSaturation();});
    }
  }

  pickHue(e: MouseEvent): RGB {
    // Récupération de la position de la souris
    const mousePos = this.getMousePos(this.canvasHue?.nativeElement, e);
    // Récupération des données de l'image
    const imageData = this.hueCtx?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    if (!imageData) {
      return new RGB(0, 0, 0);
    }
    // Récupération de la couleur sélectionnée
    return new RGB(imageData[0], imageData[1], imageData[2]);
  }

  pickColor(e: MouseEvent): RGB {
    const mousePos = this.getMousePos(this.canvasSaturation?.nativeElement, e);
    const imageData = this.saturationCtx?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    if (!imageData) {
      return new RGB(0, 0, 0);
    }
    console.log(this.saturationCtx?.canvas);
    return new RGB(imageData[0], imageData[1], imageData[2]);
  }
  
  getMousePos(canvas: HTMLCanvasElement | undefined, e: MouseEvent): {x: number, y: number} {
    if (canvas) {
      // Récupération de la position du canvas
      const rect = canvas.getBoundingClientRect();
      console.log("width : " + rect.width + " height : " + rect.height);
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return {x: 0, y: 0};
  }

  crayon() {
    console.log('crayon');
  }

  gomme() {
    console.log('gomme');
  }

  selection() {
    console.log('selection');
  }

  remplissage() {
    console.log('remplissage');
  }

  pipette() {
    console.log('pipette');
  }

  baguette() {
    console.log('baguette');
  }

  formes() {
    console.log('formes');
  }
}
