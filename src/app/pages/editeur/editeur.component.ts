import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Calque } from '../../classes/Calque';
import { Subscription } from 'rxjs';
import { DataProject } from '../projet/projet.component';
import { Grille } from '../../classes/Grille';
import { RGB } from '../../classes/color/RGB';
import { Pixel } from '../../classes/Pixel';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [CalqueComponent, GrilleComponent, OutilComponent, PopupComponent],
  templateUrl: './editeur.component.html',
  styleUrl: './editeur.component.scss'
})

export class EditeurComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('calque', { static: true }) calque: CalqueComponent | undefined;
  @ViewChild('grille', { static: true }) grille: GrilleComponent | undefined;
  @ViewChild('outil', { static: true }) outil: OutilComponent | undefined;

  hauteur: number = 0;
  largeur: number = 0;
  couleur: string = "#FFFFFF";
  id: number | undefined = 0;
  isLoadingProject: boolean = false;

  layerList: Calque[] = [];
  selectedLayer: number = 0;
  layerCount: number = 0;

  private subscriptions: Subscription[] = [];
  private loadedCalques: { [name: string]: { pos: number , grille?: { [y: number]: string[] }} } = {};
  public popupTitre: string = "";
  public popupDesc: string = "";
  public popupBgColor: string = "";
  public popupListeBoutons: {name: string, action: () => void, color: string }[] = [];

  constructor(
    private popupService: PopupService,
    private router: Router,
      private appService: AppService) {
      const navigation = this.router.getCurrentNavigation()?.extras.state;
      if (navigation) {
        const data = JSON.parse(navigation['data']).project as DataProject;
        this.id = data.id;
        this.largeur = data.taille[0];
        this.hauteur = data.taille[1];
        this.couleur = data.bgcolor ?? '';
        this.appService.setProjectName(data.name);
        if (data.calques) {
          this.loadedCalques = data.calques
        };
      }
    }

  ngOnInit(): void {
    this.subscriptions.push(this.popupService.popupChange$.subscribe((popup) => {
      this.changePopup(popup.titre, popup.bgColor, popup.desc, popup.listeBoutons);
    }));

    this.subscriptions.push(this.popupService.popupActive$.subscribe(() => {
      this.activePopup();
    }));

    this.subscriptions.push(this.popupService.popupClose$.subscribe(() => {
      this.closePopup();
    }));
  }

  ngAfterViewInit(): void {
    // TODO: Charger les calques
    const loadedCalquesKeys = Object.keys(this.loadedCalques);
    if (loadedCalquesKeys.length > 0) {
      for (let calque of loadedCalquesKeys) {
        const dataCalque = this.loadedCalques[calque];
        const nomCalque = calque;
        const objCalque = new Calque(nomCalque, dataCalque.pos, this.hauteur, this.largeur);
        const objGrille = new Grille(this.hauteur, this.largeur);

        for (let y = 0; y < this.hauteur; y++) {
          for (let x = 0; x < this.largeur; x++) {
            const color = new RGB();
            color.HexaversRGB(dataCalque.grille![y][x]);
            const pixel = new Pixel(); pixel.setColor(color);
            objGrille.setPixelAt(x, y, pixel);
          }
        }

        objCalque.setGrille(objGrille);
        this.layerList.push(objCalque);
      }
      this.loadedCalques = {};
      this.layerList = [...this.layerList];
      this.isLoadingProject = true;
    } else {
        // Création d'un calque par défaut.
        const defaultLayer = new Calque("Calque par défaut", 0, this.hauteur, this.largeur);
        for (let y = 0; y < this.hauteur; y++) {
          for (let x = 0; x < this.largeur; x++) {
            const pixel = new Pixel();
            pixel.setColor(new RGB(parseInt(this.couleur.slice(1,3), 16), parseInt(this.couleur.slice(3,5), 16), parseInt(this.couleur.slice(5,7), 16), 255));
            defaultLayer.getGrille().setPixelAt(x, y, pixel);
          }
        }
        this.layerList = [defaultLayer];
        this.isLoadingProject = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.appService.setProjectName('');
  }

  recalculateLayersPosition() {
    for (let i = 0; i < this.layerList.length; i++) {
      this.layerList[i].setPosition(i)
    }
  }

  addLayer() {
    this.layerCount++;
    const layerName = "Nouveau Calque " + this.layerCount;
    const newLayer = new Calque(layerName, this.layerList.length ,this.hauteur, this.largeur)
    this.layerList = [...this.layerList, newLayer];
    this.recalculateLayersPosition();
  }

  hideLayer(index: number) {
    this.layerList[index].setEstVisible(!this.layerList[index].getEstVisible());
  }

  deleteLayer(index: number) {
    if (this.layerList.length > 1) {
      this.layerList.splice(index, 1);
      this.layerList = [...this.layerList]
      this.recalculateLayersPosition();
    }
    if (index === this.layerList.length) {
      this.selectedLayer = index - 1;
    }
  }

  selectLayer(index: number) {
    this.selectedLayer = index;
  }

  layerDown(index: number) {
    if (index > 0) {
      const temp = this.layerList[index];
      this.layerList[index] = this.layerList[index - 1];
      this.layerList[index - 1] = temp;
      this.layerList = [...this.layerList];
      this.recalculateLayersPosition();
      this.selectedLayer = index - 1;
    }
  }

  layerUp(index: number) {
    if (index >= 0) {
      const temp = this.layerList[index];
      this.layerList[index] = this.layerList[index + 1];
      this.layerList[index + 1] = temp;
      this.layerList = [...this.layerList];
      this.recalculateLayersPosition();
      this.selectedLayer = index + 1;
    }
  }

  onGrilleClicked($event: { x: number; y: number; }) {
    // Effectuez l'action de l'outil actuel
    this.outil?.action(this.grille, $event.x, $event.y);
  }

  changePopup(titre: string, bgColor: string, desc: string, listeBoutons: {name: string, action: () => void, color: string }[]) {
    this.popupTitre = titre;
    this.popupBgColor = bgColor;
    this.popupDesc = desc;
    this.popupListeBoutons = listeBoutons;
  }

  activePopup() {
    document.getElementById('popup')?.classList.remove('hidden');
  }

  closePopup() {
    document.getElementById('popup')?.classList.add('hidden');
  }
}
