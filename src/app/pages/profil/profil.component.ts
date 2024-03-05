import { Component, ElementRef } from '@angular/core';
import { ButtonColor, PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  public titre: string = "Bonjour";
  public description: string = "Je suis un utilisateur de Pixees";
  public listeBoutons: {name: string, action: () => void, color: string }[] = [
    { name: "Ajouter", action: () => console.log("Ajouter un profil"), color: ButtonColor.Green },
    { name: "Modifier", action: () => this.modifierProfil(), color: ButtonColor.Blue },
    { name: "Supprimer", action: () => console.log("Supprimer le profil"), color: ButtonColor.Red },
  ];

  constructor() { }


  modifierProfil() {
    console.log("Modifier le profil");
  }
}
