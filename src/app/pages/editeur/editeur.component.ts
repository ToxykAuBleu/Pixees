import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Calque } from '../../../Algo/scripts/Calque';
import { Subscription } from 'rxjs';
import { DataProject } from '../projet/projet.component';

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
  id: number | undefined = 0;

  layerList: Calque[] = [];
  selectedLayer: number = 0;
  layerCount: number = 0;

  private subscriptions: Subscription[] = [];
  private loadedGrid: { [y:number] : string[] } = {};
  public popupTitre: string = "";
  public popupDesc: string = "";
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
      this.appService.setProjectName(data.name);
      if (data.grille) this.loadedGrid = data.grille;
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.popupService.popupChange$.subscribe((popup) => {
      this.changePopup(popup.titre, popup.desc, popup.listeBoutons);
    }));

    this.subscriptions.push(this.popupService.popupActive$.subscribe(() => {
      this.activePopup();
    }));

    this.subscriptions.push(this.popupService.popupClose$.subscribe(() => {
      this.closePopup();
    }));
  }

  ngAfterViewInit(): void {
    this.layerList = [new Calque("Calque par défaut", 0, this.hauteur, this.largeur)];
    // TODO: Charger la grille depuis data.grille
    if (this.loadedGrid && this.grille && this.grille.ctx) {
      console.log("Test chargement grille");
      for (let y = 0; y < this.hauteur; y++) {
        for (let x = 0; x < this.largeur; x++) {
          const color = this.loadedGrid[y][x];
          const formattedColor = `rgba(${parseInt(color.slice(0,2), 16)}, ${parseInt(color.slice(2,4), 16)}, ${parseInt(color.slice(4,6), 16)}, ${parseInt(color.slice(6,8), 16)})`
          console.log(formattedColor);
          this.grille.ctx.fillStyle = formattedColor;
          this.grille.ctx.fillRect(x, y, 1, 1);
        }
      }
      this.loadedGrid = {};
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
    console.log("Editor : Layer Hidden :" + index);
    this.layerList[index].setEstVisible(!this.layerList[index].getEstVisible());
  }

  deleteLayer(index: number) {
    console.log("Layer Deleted");
    this.layerList.splice(index, 1);
    this.layerList = [...this.layerList]
    this.recalculateLayersPosition();
    console.log(this.layerList);
  }

  selectLayer(index: number) {
    this.selectedLayer = index;
    console.log("Selected Layer: " + index);
  }

  layerDown(index: number) {
    console.log("Layer Moved Up" + index);
    if (index > 0) {
      const temp = this.layerList[index];
      this.layerList[index] = this.layerList[index - 1];
      this.layerList[index - 1] = temp;
      this.recalculateLayersPosition();
      this.selectedLayer = index - 1;
      console.log(this.selectedLayer);
    }
  }

  layerUp(index: number) {
    console.log("Layer Moved Down" + index);
    if (index >= 0) {
      const temp = this.layerList[index];
      this.layerList[index] = this.layerList[index + 1];
      this.layerList[index + 1] = temp;
      this.recalculateLayersPosition();
      this.selectedLayer = index + 1;
      console.log(this.selectedLayer);
    }
  }

  onGrilleClicked($event: { x: number; y: number; }) {
    console.log("click  ");
    // Effectuez l'action de l'outil actuel
    this.outil?.action(this.grille, $event.x, $event.y);
  }

  changePopup(titre: string, desc: string, listeBoutons: {name: string, action: () => void, color: string }[]) {
    this.popupTitre = titre;
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
