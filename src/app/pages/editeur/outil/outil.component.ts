import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faEraser, faVectorSquare, faFillDrip, faEyeDropper, faWandMagic, faShapes } from '@fortawesome/free-solid-svg-icons';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RGB } from '../../../../Algo/scripts/color/RGB';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-outil',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ColorPickerModule, FormsModule],
  templateUrl: './outil.component.html',
  styleUrl: './outil.component.scss'
})
export class OutilComponent {
  @ViewChild('hueCanvas', { static: false }) canvasHue: ElementRef<HTMLCanvasElement> | undefined;
  hueCtx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('saturationCanvas', { static: false }) canvasSaturation: ElementRef<HTMLCanvasElement> | undefined;
  saturationCtx: CanvasRenderingContext2D | null | undefined;

  color: any;

  colorBuffer: (RGB | null)[] = [];

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  constructor() { }

  

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
