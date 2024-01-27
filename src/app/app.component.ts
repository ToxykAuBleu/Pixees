import { Component, ViewEncapsulation } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faPencil , faPaperPlane, faBell, faMagnifyingGlass, faDownload, faFloppyDisk, faFileImport, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, AdministrationComponent, CollectionComponent, CompteComponent, ConnexionComponent, DiscussionComponent, EditeurComponent, InscriptionComponent, NotificationsComponent, ProfilComponent, ProjetComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  // Icone de la barre de navigation côté réseau social
  faHouse = faHouse;
  faPencil = faPencil;
  faPaperPlane = faPaperPlane;
  faBell = faBell;
  faCircleUser = faCircleUser;
  faMagnifyingGlass = faMagnifyingGlass;

  // Icone de la barre de navigation côté éditeur
  faDownload = faDownload;
  faFloppyDisk = faFloppyDisk;
  faFileImport = faFileImport;
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faXmarkCircle = faXmarkCircle;

  title = 'Pixees';
  public couleur = "couleurAccueil";
  isInEditor: boolean = false;

  constructor(private router: Router) {};
  goToHome() {
    this.router.navigate(['/', 'home']);
    this.couleur = "couleurAccueil";
    this.isInEditor = false;
  }
  goToProjet() {
    this.router.navigate(['/', 'projet']);
    this.couleur = "couleurCreation";
    this.isInEditor = true;
  }
  goToNotification() {
    this.router.navigate(['/', 'notifications']);
    this.couleur = "couleurProfil";
    this.isInEditor = false;
  }
  goToAccount() {
    this.router.navigate(['/', 'compte']);
    this.couleur = "couleurProfil";
    this.isInEditor = false;
  }
  goToDiscussion() {
    this.router.navigate(['/', 'discussion']);
    this.couleur = "couleurDiscussion";
    this.isInEditor = false;
  }
  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
    this.couleur = "couleurProfil";
    this.isInEditor = false;
  }
}


