import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, Output, EventEmitter, OnInit, OnDestroy, Input, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { RGB } from '../../../../Algo/scripts/color/RGB'
import { Couleur } from '../../../../Algo/scripts/color/Couleur';
import { GrilleService } from '../../../grille-service.service';
import { AppService } from '../../../app.service';
import { PopupService } from '../../popup/popup.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Calque } from '../../../../Algo/scripts/Calque';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @Input() hauteur!: number;
  @Input() largeur!: number;
  @Input() layers: Calque[] = [];
  @Input() selectedLayerIndex: number = 0;

  @Output() grilleClicked = new EventEmitter<{ x: number, y: number }>();

  @ViewChild('clickHandler', { static: false }) clickHandler: ElementRef<HTMLCanvasElement> | undefined;

  // @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChildren('canvases') canvases: QueryList<ElementRef<HTMLCanvasElement>> | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  @ViewChild('gridCanvas', { static: false }) gridCanvas: ElementRef<HTMLCanvasElement> | undefined;
  gridCtx: CanvasRenderingContext2D | null | undefined;

  grille: Grille | undefined;
  mouseDown: boolean = false;

  x_init: number = 0;
  y_init: number = 0;

  private subscriptions: Subscription[] = [];

  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private grilleService: GrilleService) 
  {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.grilleService.grille$.subscribe(() => {
      this.exportAsPNG();
    }));

    // this.subscriptions.push(this.grilleService.save$.subscribe((close: boolean) => {
    //   this.saveAsJSON(close);
    // }));
    console.log(this.hauteur);
  }
  
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  
  ngAfterViewInit(): void {
    // this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.gridCtx = this.gridCanvas?.nativeElement.getContext('2d');
    // Récupération de la hauteur et de la largeur du canvas
    this.drawGrid(this.hauteur, this.largeur);

    this.clickHandler?.nativeElement.addEventListener('mousedown', (e) => {
      console.log("object");
      let { x, y } = this.getMousePos(this.gridCanvas!.nativeElement, e);
      console.log(x, y);
      this.x_init = x;
      this.y_init = y;
      this.onGrilleClick(x, y);
      this.mouseDown = !this.mouseDown;
    });

    this.clickHandler?.nativeElement.addEventListener('mousemove', (e) => {
      if(this.mouseDown) {
        let { x, y } = this.getMousePos(this.gridCanvas!.nativeElement, e);
        this.onGrilleClick(x, y);
        this.x_init = x;
        this.y_init = y;
      }
    });
    
    this.clickHandler?.nativeElement.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.layers[this.selectedLayerIndex].getGrille().canvasToGrid(this.ctx);
      }
      this.x_init = 0;
      this.y_init = 0;
    });

    this.clickHandler?.nativeElement.addEventListener('mouseleave', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.layers[this.selectedLayerIndex].getGrille().canvasToGrid(this.ctx);
      }
      this.x_init = 0;
      this.y_init = 0;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['selectedLayerIndex']) {
      this.ctx = this.canvases?.toArray()[this.selectedLayerIndex].nativeElement.getContext('2d');
      console.log(this.ctx);
    }
  }

  getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(canvas.width * (evt.clientX - rect.left) / rect.width),
      y: Math.floor(canvas.height * (evt.clientY - rect.top) / rect.height)
    };
  }

  onGrilleClick(x: number, y: number) {
    console.log("grille clicked");
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
  drawGrid(hauteur: number, largeur: number): void {
    if (!this.gridCtx || !this.gridCanvas) {
      return;
    }

    if (!this.clickHandler) {
      return;
    }

    this.clickHandler.nativeElement.width = largeur;
    this.clickHandler.nativeElement.height = hauteur;

    // Ajustement de la taille du Canvas de la grille
    this.gridCanvas.nativeElement.width = largeur;
    this.gridCanvas.nativeElement.height = hauteur;

    // Création du pattern
    const pattern = this.gridCtx.createPattern(this.drawPattern()!, "repeat");

    // Application du pattern
    this.gridCtx.fillStyle = pattern as CanvasPattern;
    this.gridCtx.fillRect(0, 0, largeur, hauteur);
  }

  // Dessiner
  draw(x: number, y: number, rayon: number, couleur: RGB): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgba(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)}, ${couleur.getAlpha()})`;
    this.ctx.strokeStyle = `rgba(${couleur.getComp(1)}, ${couleur.getComp(2)} ,${couleur.getComp(3)}, ${couleur.getAlpha()})`;
    if (rayon == 1) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.fillRect(x, y, rayon, rayon);
      this.ctx.moveTo(this.x_init, this.y_init);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.ctx.arc(x, y, rayon, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    }
    console.log("drawn !");
    // this.grille?.canvasToGrid(this.ctx);
  }

  // Effacer
  clear(x: number, y: number, rayon: number): void {
    if (!this.ctx) {
      return;
    }
    if (rayon == 1) {
      this.ctx.clearRect(x, y, rayon, rayon);
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
    // Création du Canvas pour dessiner le pattern
    const exportCanvas = document.createElement("canvas");
    const exportContext = exportCanvas.getContext("2d");
    // Ajustement de la taille du Canvas
    exportCanvas.width = this.largeur;
    exportCanvas.height = this.hauteur;

    if (!exportContext) {
      return;
    }

    for (let layer of this.layers) {
      for (let x = 0; x < this.largeur; x++) {
        for (let y = 0; y < this.hauteur; y++) {
          const pixel = layer.getGrille().getPixelAt(x, y).getColor() as RGB;
          exportContext.fillStyle = `rgba(${pixel.getComp(1)}, ${pixel.getComp(2)} ,${pixel.getComp(3)}, ${pixel.getAlpha()})`;
          exportContext.fillRect(x, y, 1, 1);
        }
      }
    }

    const dataURL = exportCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
    console.log("exported !");
  }

  // async saveAsJSON(close: boolean = false): Promise<string | void> {
  //   if (!this.canvas) {
  //     return;
  //   }

  //   // NOTE: Il faudra vérifier en amont que l'utilisateur soit bien connecté.
  //   const abortController = new AbortController();
  //   const saveFunction = new Promise<string | void>(async (resolve, reject) => {
  //     // Création de l'objet projet à sauvegarder.
  //     let data: DataProject = {
  //       name: "projet",
  //       taille: [this.grille?.getLargeur()!, this.grille?.getHauteur()!],
  //       grille: {}
  //     };

  //     // Sauvegarde du projet.
  //     // NOTE: Pour le moment, ceci ne sauvegarde que le calque par défaut.
  //     const largeur = this.grille?.getLargeur();
  //     const hauteur = this.grille?.getHauteur();
  //     for (let x = 0; x < largeur!; x++) {
  //       data.grille[x] = [];
  //       for (let y = 0; y < hauteur!; y++) {
  //         if (abortController.signal.aborted) {
  //           reject(void 0);
  //         }

  //         const pixel = this.grille?.getPixelAt(x, y).getColor() as RGB;
  //         const c = pixel?.RGBversHexa().slice(1);
  //         data.grille[x].push(c);
  //       }
  //     }

  //     await new Promise(resolve => setTimeout(resolve, 3000));
  //     // Résolution de la promesse avec les données sauvegardées.
  //     resolve(JSON.stringify(data));
  //   });

  //   this.popupService.changePopup("Sauvegarde", "Sauvegarde en cours...", [
  //     { name: "Annuler", action: () => {
  //       abortController.abort();
  //       this.popupService.closePopup();
  //     }, color: ButtonColor.Red }
  //   ]);

  //   this.popupService.activePopup();
  //   const result = await saveFunction;

  //   if (result) {
  //     // Envoi des données sauvegardées au serveur.
  //     /* Pour la suite des opérations, il faut faire une requête POST au serveur.
  //      * Cependant, il faut un identifiant pour le projet, donc 2 cas de figures:
  //      * - soit on a déjà un identifiant pour ce projet, et on fait une requête avec cet identifiant;
  //      * - soit on n'a pas d'identifiant pour ce projet, et on fait une requête pour en obtenir un, 
  //      *  puis on fait une requête pour sauvegarder les données.
  //      */
  //     console.log(result);

  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  //       }),
  //       withCredentials: true
  //     };
  //     this.http.post(`${environment.apiLink}/project/save.php`, result, httpOptions)
  //       .subscribe({
  //         next: (res) => {
  //           if (res.valueOf().hasOwnProperty('error')) {
  //             console.error(res);
  //           } else {
  //             // TODO: Ajouter une popup pour indiquer que la sauvegarde a réussi.
  //           }
  //         },
  //         error: (err) => {
  //           console.error(err);
  //         },
  //         complete: () => {
  //           console.log("Terminado !");
  //           this.popupService.closePopup();
  //           if (close) {
  //             this.appService.triggerCloseEditor();
  //           }
  //         }
  //       });
  //   }
  // }
}

interface DataProject {
  name: string;
  taille: [number, number];
  grille: {
    [y: number]: string[]
  };
}