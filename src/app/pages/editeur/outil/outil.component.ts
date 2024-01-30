import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faEraser, faVectorSquare, faFillDrip, faEyeDropper, faWandMagic, faShapes } from '@fortawesome/free-solid-svg-icons';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RGB } from '../../../../Algo/scripts/color/RGB';
import { GrilleComponent } from '../grille/grille.component';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  imports: [CommonModule, FontAwesomeModule, ColorPickerModule, FormsModule],
  templateUrl: './outil.component.html',
  styleUrl: './outil.component.scss'
})

export class OutilComponent implements AfterViewInit {
  @ViewChild('sizeInput', { static: false }) sizeInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('sizeSlider', { static: false }) sizeSlider: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('toleranceInput', { static: false }) toleranceInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('toleranceSlider', { static: false }) toleranceSlider: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('hexInput', { static: false }) hexInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('redInput', { static: false }) redInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('greenInput', { static: false }) greenInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('blueInput', { static: false }) blueInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('alphaInput', { static: false }) alphaInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('alphaSlider', { static: false }) alphaSlider: ElementRef<HTMLInputElement> | undefined;

  hexaColor: any = '#000000';
  transparency: number = 100;
  finalColor: RGB = new RGB(0, 0, 0, 1);

  faPencil = faPencil;
  faEraser = faEraser;
  faVectorSquare = faVectorSquare;
  faFillDrip = faFillDrip;
  faEyeDropper = faEyeDropper;
  faWandMagic = faWandMagic;
  faShapes = faShapes;

  outilActuel: Outil = Outil.Crayon;
  isResizable: boolean = true;
  isTolerance: boolean = true;

  taille: number = 1;
  tolerance: number = 0;

  actionsParOutil = {
    [Outil.Crayon]: (grille: GrilleComponent, x: number, y: number) => this.actionCrayon(grille, x, y),
    [Outil.Gomme]: (grille: GrilleComponent, x: number, y: number) => this.actionGomme(grille, x, y),
    [Outil.Selection]: (grille: GrilleComponent, x: number, y: number) => this.actionSelection(grille, x, y),
    [Outil.Remplissage]: (grille: GrilleComponent, x: number, y: number) => this.actionRemplissage(grille, x, y),
    [Outil.Pipette]: (grille: GrilleComponent, x: number, y: number) => this.actionPipette(grille, x, y),
    [Outil.Baguette]: (grille: GrilleComponent, x: number, y: number) => this.actionBaguette(grille, x, y),
    [Outil.Formes]: (grille: GrilleComponent, x: number, y: number) => this.actionFormes(grille, x, y),
  };

  action(grille: GrilleComponent | undefined, x: number, y: number) {
    this.actionsParOutil[this.outilActuel](grille!, x, y);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.sizeInput!.nativeElement.value = this.taille.toString();
    this.sizeSlider!.nativeElement.value = this.taille.toString();
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
      this.hexaColor = '#' + value;
      this.finalColor = this.toColorRGB(this.hexaColor);
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
      let newString = this.replaceAt(1, value.toString(16), this.hexaColor);
      this.hexaColor = newString;
      this.hexInput!.nativeElement.value = this.hexaColor.slice(1);
      this.finalColor = this.toColorRGB(this.hexaColor);
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
      let newString = this.replaceAt(3, value.toString(16), this.hexaColor);
      this.hexaColor = newString;
      this.hexInput!.nativeElement.value = this.hexaColor.slice(1);
      this.finalColor = this.toColorRGB(this.hexaColor);
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
      let newString = this.replaceAt(5, value.toString(16), this.hexaColor);
      this.hexaColor = newString;
      this.hexInput!.nativeElement.value = this.hexaColor.slice(1);
    });
    // Listener sur le changement de la couleur Alpha (Input)
    this.alphaInput?.nativeElement.addEventListener('input', () => {
      this.alphaSlider!.nativeElement.value = this.alphaInput!.nativeElement.value;
      this.transparency = parseInt(this.alphaInput!.nativeElement.value, 10);
      this.finalColor = this.toColorRGB(this.hexaColor);
    });
    // Listener sur le changement de la couleur Alpha (Slider)
    this.alphaSlider?.nativeElement.addEventListener('input', () => {
      this.alphaInput!.nativeElement.value = this.alphaSlider!.nativeElement.value;
      this.transparency = parseInt(this.alphaSlider!.nativeElement.value, 10);
      this.finalColor = this.toColorRGB(this.hexaColor);
    });
    // Listener sur le changement de la taille (Input)
    this.sizeInput?.nativeElement.addEventListener('input', () => {
      this.sizeSlider!.nativeElement.value = this.sizeInput!.nativeElement.value;
      this.taille = parseInt(this.sizeInput!.nativeElement.value, 10);
    });
    // Listener sur le changement de la taille (Slider)
    this.sizeSlider?.nativeElement.addEventListener('input', () => {
      this.sizeInput!.nativeElement.value = this.sizeSlider!.nativeElement.value;
      this.taille = parseInt(this.sizeSlider!.nativeElement.value, 10);
    });
    this.sizeInput!.nativeElement.value = this.taille.toString();
    this.sizeSlider!.nativeElement.value = this.taille.toString();
    this.isTolerance = false;
    this.changeDetectorRef.detectChanges();
  }

  colorChange() {
    this.hexInput!.nativeElement.value = this.hexaColor.slice(1);
    this.finalColor.HexaversRGB(this.hexaColor.slice(1));
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
    this.outilActuel = Outil.Crayon;
    this.isResizable = true;
    this.isTolerance = false;
    this.changeDetectorRef.detectChanges();
    // Listener sur le changement de la taille (Input)
    this.sizeInput?.nativeElement.addEventListener('input', () => {
      this.sizeSlider!.nativeElement.value = this.sizeInput!.nativeElement.value;
      this.taille = parseInt(this.sizeInput!.nativeElement.value, 10);
    });
    // Listener sur le changement de la taille (Slider)
    this.sizeSlider?.nativeElement.addEventListener('input', () => {
      this.sizeInput!.nativeElement.value = this.sizeSlider!.nativeElement.value;
      this.taille = parseInt(this.sizeSlider!.nativeElement.value, 10);
    });
    this.sizeInput!.nativeElement.value = this.taille.toString();
    this.sizeSlider!.nativeElement.value = this.taille.toString();
  }

  gomme() {
    this.outilActuel = Outil.Gomme;
    this.isResizable = true;
    this.isTolerance = false;
    this.changeDetectorRef.detectChanges();
    // Listener sur le changement de la taille (Input)
    this.sizeInput?.nativeElement.addEventListener('input', () => {
      this.sizeSlider!.nativeElement.value = this.sizeInput!.nativeElement.value;
      this.taille = parseInt(this.sizeInput!.nativeElement.value, 10);
    });
    // Listener sur le changement de la taille (Slider)
    this.sizeSlider?.nativeElement.addEventListener('input', () => {
      this.sizeInput!.nativeElement.value = this.sizeSlider!.nativeElement.value;
      this.taille = parseInt(this.sizeSlider!.nativeElement.value, 10);
    });
    this.sizeInput!.nativeElement.value = this.taille.toString();
    this.sizeSlider!.nativeElement.value = this.taille.toString();
  }

  selection() {
    this.outilActuel = Outil.Selection;
    this.isResizable = false;
    this.isTolerance = false;
  }

  remplissage() {
    this.outilActuel = Outil.Remplissage;
    this.isResizable = false;
    this.isTolerance = true;
    this.changeDetectorRef.detectChanges();
    // Listener sur le changement de la tolérance (Input)
    this.toleranceInput?.nativeElement.addEventListener('input', () => {
      this.toleranceSlider!.nativeElement.value = this.toleranceInput!.nativeElement.value;
      this.tolerance = parseInt(this.toleranceInput!.nativeElement.value, 10);
    });
    // Listener sur le changement de la tolérance (Slider)
    this.toleranceSlider?.nativeElement.addEventListener('input', () => {
      this.toleranceInput!.nativeElement.value = this.toleranceSlider!.nativeElement.value;
      this.tolerance = parseInt(this.toleranceSlider!.nativeElement.value, 10);
    });
    this.toleranceInput!.nativeElement.value = this.tolerance.toString();
    this.toleranceSlider!.nativeElement.value = this.tolerance.toString();
  }

  pipette() {
    this.outilActuel = Outil.Pipette;
    this.isResizable = false;
    this.isTolerance = false;
  }

  baguette() {
    this.outilActuel = Outil.Baguette;
    this.isResizable = false;
    this.isTolerance = true;
    this.changeDetectorRef.detectChanges();
    // Listener sur le changement de la tolérance (Input)
    this.toleranceInput?.nativeElement.addEventListener('input', () => {
      this.toleranceSlider!.nativeElement.value = this.toleranceInput!.nativeElement.value;
      this.tolerance = parseInt(this.toleranceInput!.nativeElement.value, 10);
    });
    // Listener sur le changement de la tolérance (Slider)
    this.toleranceSlider?.nativeElement.addEventListener('input', () => {
      this.toleranceInput!.nativeElement.value = this.toleranceSlider!.nativeElement.value;
      this.tolerance = parseInt(this.toleranceSlider!.nativeElement.value, 10);
    });
    this.toleranceInput!.nativeElement.value = this.tolerance.toString();
    this.toleranceSlider!.nativeElement.value = this.tolerance.toString();
  }

  formes() {
    this.outilActuel = Outil.Formes;
    console.log("Formes selected");
    this.isResizable = false;
    this.isTolerance = false;
  }

  actionCrayon(grille: GrilleComponent, x: number, y: number) {
    grille.draw(x, y, this.taille, this.finalColor);
  }

  actionGomme(grille: GrilleComponent, x: number, y: number) {
    grille.clear(x, y, this.taille);
  }

  actionSelection(grille: GrilleComponent, x: number, y: number) {
    console.log("actionSelection");
  }

  actionRemplissage(grille: GrilleComponent, x: number, y: number) {
    console.log("actionRemplissage");
  }

  actionPipette(grille: GrilleComponent, x: number, y: number) {
    this.finalColor = grille.pickColor(x, y) as RGB;
    this.hexaColor = this.finalColor.RGBversHexa();
  }

  actionBaguette(grille: GrilleComponent, x: number, y: number) {
    console.log("actionBaguette");
  }

  actionFormes(grille: GrilleComponent, x: number, y: number) {
    console.log("actionFormes");
  }
}
