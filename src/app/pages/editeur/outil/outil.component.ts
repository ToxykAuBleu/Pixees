import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class OutilComponent implements AfterViewInit {
  @ViewChild('hueCanvas', { static: false }) canvasHue: ElementRef<HTMLCanvasElement> | undefined;
  hueCtx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('saturationCanvas', { static: false }) canvasSaturation: ElementRef<HTMLCanvasElement> | undefined;
  saturationCtx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('hexInput', { static: false }) hexInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('redInput', { static: false }) redInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('greenInput', { static: false }) greenInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('blueInput', { static: false }) blueInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('alphaInput', { static: false }) alphaInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('alphaSlider', { static: false }) alphaSlider: ElementRef<HTMLInputElement> | undefined;

  color: any = '#000000';
  transparency: number = 100;
  finalColor: RGB = new RGB(0, 0, 0, 1);

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  constructor() {
  }
  
  ngAfterViewInit() {
    // Listener sur le changement de la couleur Héxadécimale
    this.hexInput?.nativeElement.addEventListener('input', () => {
      let value = this.hexInput?.nativeElement.value!;
      if (value.length > 6) {
        value = value.slice(0, 6);
        this.hexInput!.nativeElement.value = value;
      }
      if (value.length === 6) {
        const isValidRGB = /^([0-9A-Fa-f]{2}){3}$/.test(value);
        if (!isValidRGB) {
          value = '000000';
          this.hexInput!.nativeElement.value = "";
        }
      }
      this.color = '#' + value;
      this.finalColor = this.toColorRGB(this.color);
    });
    // Listener sur le changement de la couleur Rouge
    this.redInput?.nativeElement.addEventListener('input', () => {
      let value = parseInt(this.redInput?.nativeElement.value!, 10);
      if (value < 0) {
        value = 0;
        this.redInput!.nativeElement.value = value.toString();
      }
      if (value > 255) {
        value = 255;
        this.redInput!.nativeElement.value = value.toString();
      }
      let newString = this.replaceAt(1, value.toString(16), this.color);
      this.color = newString;
      this.hexInput!.nativeElement.value = this.color.slice(1);
      this.finalColor = this.toColorRGB(this.color);
    });
    // Listener sur le changement de la couleur Verte
    this.greenInput?.nativeElement.addEventListener('input', () => {
      let value = parseInt(this.greenInput?.nativeElement.value!, 10);
      if (value < 0) {
        value = 0;
        this.greenInput!.nativeElement.value = value.toString();
      }
      if (value > 255) {
        value = 255;
        this.greenInput!.nativeElement.value = value.toString();
      }
      let newString = this.replaceAt(3, value.toString(16), this.color);
      this.color = newString;
      this.hexInput!.nativeElement.value = this.color.slice(1);
      this.finalColor = this.toColorRGB(this.color);
    });
    // Listener sur le changement de la couleur Bleue
    this.blueInput?.nativeElement.addEventListener('input', () => {
      let value = parseInt(this.blueInput?.nativeElement.value!, 10);
      if (value < 0) {
        value = 0;
        this.blueInput!.nativeElement.value = value.toString();
      }
      if (value > 255) {
        value = 255;
        this.blueInput!.nativeElement.value = value.toString();
      }
      let newString = this.replaceAt(5, value.toString(16), this.color);
      this.color = newString;
      this.hexInput!.nativeElement.value = this.color.slice(1);
    });
    // Listener sur le changement de la couleur Alpha (Input)
    this.alphaInput?.nativeElement.addEventListener('input', () => {
      this.alphaSlider!.nativeElement.value = this.alphaInput!.nativeElement.value;
      this.transparency = parseInt(this.alphaInput!.nativeElement.value, 10);
      this.finalColor = this.toColorRGB(this.color);
    });
    // Listener sur le changement de la couleur Alpha (Slider)
    this.alphaSlider?.nativeElement.addEventListener('input', () => {
      this.alphaInput!.nativeElement.value = this.alphaSlider!.nativeElement.value;
      this.transparency = parseInt(this.alphaSlider!.nativeElement.value, 10);
      this.finalColor = this.toColorRGB(this.color);
    });
  }

  colorChange() {
    this.hexInput!.nativeElement.value = this.color.slice(1);
    this.finalColor.HexaversRGB(this.color.slice(1));
    this.redInput!.nativeElement.value = this.finalColor.getComp(1)?.toString()!;
    this.greenInput!.nativeElement.value = this.finalColor.getComp(2)?.toString()!;
    this.blueInput!.nativeElement.value = this.finalColor.getComp(3)?.toString()!;
  }

  replaceAt(index: number, replacement: string, original: string): string {
    if (replacement.length <= 1) {
      replacement = '0' + replacement;
    }
    return original.slice(0, index) + replacement + original.slice(index + replacement.length);
  }

  toColorRGB(color: string): RGB {
    let red = parseInt(color.slice(1, 3), 16);
    let green = parseInt(color.slice(3, 5), 16);
    let blue = parseInt(color.slice(5, 7), 16);
    let alpha = parseInt(this.alphaInput!.nativeElement.value, 10) / 100;
    return new RGB(red, green, blue, alpha);
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
