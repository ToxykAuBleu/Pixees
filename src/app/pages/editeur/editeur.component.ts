import { Component, ViewChild, OnInit } from '@angular/core';
import { CalqueComponent } from './calque/calque.component';
import { GrilleComponent } from './grille/grille.component';
import { OutilComponent } from './outil/outil.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';

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

  public popupTitre: string = "";
  public popupDesc: string = "";
  public popupListeBoutons: {name: string, action: () => void, color: string }[] = [];

  constructor(private popupService: PopupService) { }

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
