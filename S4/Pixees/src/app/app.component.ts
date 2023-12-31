import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CompteComponent } from './pages/compte/compte.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { EditeurComponent } from './pages/editeur/editeur.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, AdministrationComponent, CollectionComponent, CompteComponent, ConnexionComponent, DiscussionComponent, EditeurComponent, InscriptionComponent, NotificationsComponent, ProfilComponent, ProjetComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pixees';
  public couleur = "couleurAccueil";
  constructor(private router: Router) {};
  goToHome() {
    this.router.navigate(['/', 'home']);
    this.couleur = "couleurAccueil";
  }
  goToProjet() {
    this.router.navigate(['/', 'projet']);
    this.couleur = "couleurUtilisateur";
  }
  goToNotification() {
    this.router.navigate(['/', 'notifications']);
    this.couleur = "couleurProfil";
  }
  goToAccount() {
    this.router.navigate(['/', 'compte']);
    this.couleur = "couleurProfil";
  }
  goToDiscussion() {
    this.router.navigate(['/', 'discussion']);
    this.couleur = "couleurDiscussion";
  }
  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
    this.couleur = "couleurProfil";
  }
}


