import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Grille } from '../../../../Algo/scripts/Grille';
import { RGB } from '../../../../Algo/scripts/color/RGB'
import { Couleur } from '../../../../Algo/scripts/color/Couleur';
import { GrilleService } from '../../../grille-service.service';
import { AppService } from '../../../app.service';
import { PopupService } from '../../popup/popup.service';
import { ButtonColor } from '../../popup/popup.component';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environment';
import { Router } from '@angular/router';
import { DataProject } from '../../projet/projet.component';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() hauteur!: number;
  @Input() largeur!: number;
  @Input() id! : number;

  @Output() grilleClicked = new EventEmitter<{ x: number, y: number }>();

  @ViewChild('mainCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
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
    private grilleService: GrilleService,
    private popupService: PopupService,
    private appService: AppService,
    private http: HttpClient,
    private router: Router) 
  {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.grilleService.grille$.subscribe(() => {
      this.exportAsPNG();
    }));

    this.subscriptions.push(this.grilleService.save$.subscribe((close: boolean) => {
      this.saveAsJSON(close);
    }));
    console.log("ID: ", this.id);
  }
  
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  
  ngAfterViewInit(): void {
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.gridCtx = this.gridCanvas?.nativeElement.getContext('2d');
    // Récupération de la hauteur et de la largeur du canvas
    this.grille = this.drawGrid(this.hauteur, this.largeur);

    this.canvas?.nativeElement.addEventListener('mousedown', (e) => {
      let { x, y } = this.getMousePos(this.canvas!.nativeElement, e);
      this.x_init = x;
      this.y_init = y;
      this.onGrilleClick(x, y);
      this.mouseDown = !this.mouseDown;
    });

    this.canvas?.nativeElement.addEventListener('mousemove', (e) => {
      if(this.mouseDown) {
        let { x, y } = this.getMousePos(this.canvas!.nativeElement, e);
        this.onGrilleClick(x, y);
        this.x_init = x;
        this.y_init = y;
      }
    });
    
    this.canvas?.nativeElement.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.grille?.canvasToGrid(this.ctx);
      }
      this.x_init = 0;
      this.y_init = 0;
    });

    this.canvas?.nativeElement.addEventListener('mouseleave', (e) => {
      this.mouseDown = false;
      if (this.ctx){
        this.grille?.canvasToGrid(this.ctx);
      }
      this.x_init = 0;
      this.y_init = 0;
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
    if (!this.canvas) {
      return;
    }
    const dataURL = this.canvas.nativeElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
    console.log("exported !");
  }

  saveAsJSON(close: boolean = false): void {
    if (!this.canvas) {
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };
    // Tentative de connexion à l'API pour vérifier si l'utilisateur est connecté.
    // Si l'utilisateur n'est pas connecté, on affiche une popup pour l'en informer.
    // Si l'utilisateur est connecté, on sauvegarde le projet.
    this.http.get(`${environment.apiLink}/user/connected.php`, httpOptions).subscribe({
      next: async (res: any) => {
        if (res === false) {
          this.popupService.changePopup("Sauvegarde", "Vous n'êtes pas connecté. Veuillez vous connecter pour sauvegarder votre projet.", [
            { name: "Ok", action: () => {
              this.popupService.closePopup();
            }, color: ButtonColor.Green }
          ]);
          this.popupService.activePopup();
          return;
        } else {
          const abortController = new AbortController();
          const saveFunction = new Promise<string | void>(async (resolve, reject) => {
            // Création de l'objet projet à sauvegarder.
            // NOTE: le champ name n'est pas le bon.
            // NOTE: le champ id doit correspondre à l'id du projet si on veut le mettre à jour (actuellement, il est ignoré)
            let data: DataProject = {
              name: "projet",
              taille: [this.grille?.getLargeur()!, this.grille?.getHauteur()!],
              grille: {}
            };

            // Sauvegarde du projet.
            // NOTE: Pour le moment, ceci ne sauvegarde que le calque par défaut.
            const largeur = this.grille?.getLargeur();
            const hauteur = this.grille?.getHauteur();
            for (let y = 0; y < hauteur!; y++) {
              data.grille![y] = [];
              for (let x = 0; x < largeur!; x++) {
                if (abortController.signal.aborted) {
                  reject(void 0);
                }

                const pixel = this.grille?.getPixelAt(x, y).getColor() as RGB;
                const c = pixel?.RGBversHexa().slice(1);
                data.grille![y].push(c);
              }
            }

            await new Promise(resolve => setTimeout(resolve, 3000));
            // Résolution de la promesse avec les données sauvegardées.
            resolve(JSON.stringify(data));
          });

          this.popupService.changePopup("Sauvegarde", "Sauvegarde en cours...", [
            { name: "Annuler", action: () => {
              abortController.abort();
              this.popupService.closePopup();
            }, color: ButtonColor.Red }
          ]);

          this.popupService.activePopup();
          const result = await saveFunction;

          if (result) {
            // Fonction pour afficher une popup contenant potentiellement une erreur.
            // TODO: refaire le style des popups pour qu'elles soient plus jolies.
            const displayErrorPopup = (err: any) => {
              this.popupService.changePopup("Sauvegarde", "Une erreur est survenue lors de la sauvegarde.", [
                { name: "Ok", action: () => {
                  this.popupService.closePopup();
                }, color: ButtonColor.Green }
              ]);
              console.error(err);
            };
            
            // Envoi des données sauvegardées au serveur.
            this.http.post(`${environment.apiLink}/project/save.php`, result, httpOptions)
              .subscribe({
                next: (res) => {
                  if (res.valueOf().hasOwnProperty('error')) {
                    displayErrorPopup(res);
                  }
                },
                error: (err) => {
                  displayErrorPopup(err);
                },
                complete: () => {
                  this.popupService.closePopup();
                  // TODO: Ajouter une popup pour indiquer que la sauvegarde a réussi.
                  if (close) {
                    this.appService.triggerCloseEditor();
                  }
                }
              });
          }
        }
      }
    });
  }
}