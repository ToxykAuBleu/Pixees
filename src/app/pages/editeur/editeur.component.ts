import { Component, ViewChild, OnInit } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { LayerComponent } from './calque/layer/layer.component';
import { EditeurService } from '../../editeur.service';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [CalqueComponent, GrilleComponent, OutilComponent, PopupComponent],
  templateUrl: './editeur.component.html',
  styleUrl: './editeur.component.scss'
})

export class EditeurComponent implements OnInit {
  @ViewChild('calque', { static: true }) calque: CalqueComponent | undefined;
  @ViewChild('grille', { static: true }) grille: GrilleComponent | undefined;
  @ViewChild('outil', { static: true }) outil: OutilComponent | undefined;

  hauteur: number = 0;
  largeur: number = 0;
  layerList: LayerComponent[] = [];
  
  public popupTitre: string = "";
  public popupDesc: string = "";
  public popupListeBoutons: {name: string, action: () => void, color: string }[] = [];

  constructor(private popupService: PopupService, private router: Router, private appService: AppService, private editeurService: EditeurService) {
    const navigation = this.router.getCurrentNavigation()?.extras.state;
    if (navigation) {
      const data = JSON.parse(navigation['data']).project;
      this.hauteur = data.taille.hauteur;
      this.largeur = data.taille.largeur;
      this.appService.setProjectName(data.name);
      this.editeurService.setSize(this.hauteur, this.largeur);
    }
  }

  ngOnInit(): void {
    this.popupService.popupChange$.subscribe((popup) => {
      this.changePopup(popup.titre, popup.desc, popup.listeBoutons);
    });

    this.popupService.popupActive$.subscribe(() => {
      this.activePopup();
    });

    this.popupService.popupClose$.subscribe(() => {
      this.closePopup();
    });
  }

  onGrilleClicked($event: { x: number; y: number; }) {
    // Effectuez l'action de l'outil actuel
    this.outil?.action(this.grille, $event.x, $event.y);
  }

  addLayer() {
    this.layerList.push(new LayerComponent(this.hauteur, this.largeur));
    console.log(this.layerList);
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
