import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { gitRepoInfo } from '../version-info';
import { GrilleService } from './grille-service.service';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, AdministrationComponent, CollectionComponent, CompteComponent, ConnexionComponent, DiscussionComponent, EditeurComponent, InscriptionComponent, NotificationsComponent, ProfilComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('askToSave', { static: true}) askToSave: ElementRef | undefined;
  @ViewChild('gitInfo', { static: true}) gitInfo: ElementRef<HTMLElement> | undefined;

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
  faGithub = faGithub;
  gitRepoInfo = gitRepoInfo;
  gitLastModifDate = new Date(gitRepoInfo.date).toLocaleString();
  showGitInfo = false;

  title = 'Pixees';

  private subscriptions: Subscription[] = [];

  public couleur = "couleurAccueil";
  public isNavbarEditor: boolean = false;
  public isInEditor: boolean = false;
  
  constructor(
    private appService: AppService,
    private router: Router,
    private grilleService: GrilleService, 
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {};
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.couleur = localStorage.getItem('couleur') || "couleurAccueil";
      this.isInEditor = JSON.parse(localStorage.getItem('isInEditor') || 'false');
    }
    this.subscriptions.push(this.appService.isInEditor.subscribe(isInEditor => {
      this.isInEditor = isInEditor;
    }));

    this.subscriptions.push(this.appService.closeEditor$.subscribe(() => {
      this.closeProject();
    }));
  };

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  };

  goToHome() {
    this.router.navigate(['/', 'home']);
    this.couleur = "couleurAccueil";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
    this.askToSave?.nativeElement.classList.add('hidden');
  }
  goToProjet() {
    this.router.navigate(['/', 'projet']);
    this.couleur = "couleurCreation";
    this.isNavbarEditor = true;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }
  goToNotification() {
    this.router.navigate(['/', 'notifications']);
    this.couleur = "couleurProfil";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }
  goToAccount() {
    this.router.navigate(['/', 'compte']);
    this.couleur = "couleurProfil";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }
  goToDiscussion() {
    this.router.navigate(['/', 'discussion']);
    this.couleur = "couleurDiscussion";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }
  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
    this.couleur = "couleurProfil";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }
  goToVitrine() {
    this.router.navigate(['/', 'vitrine']);
    this.couleur = "couleurAccueil";
    this.isNavbarEditor = false;
    this.isInEditor = false;
    this.setInLocalStorage(this.couleur, this.isInEditor);
  }

  setInLocalStorage(couleur: string, isInEditor: boolean) {
    localStorage.setItem('couleur', couleur);
    localStorage.setItem('isInEditor', JSON.stringify(isInEditor));
  }

  showSave() {
    console.log(this.isInEditor);  
    if (this.isInEditor) {
      this.askToSave?.nativeElement.classList.remove('hidden');
    } else {
      this.goToHome();
    }
      console.log("Pas dans l'éditeur");
  }

  closeProject() {
    console.log("Close ça mère");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };
    this.http.get(`${environment.apiLink}/project/close.php`, httpOptions)
      .subscribe({
        complete: () => {
          this.goToHome();
        }
      });
  }

  triggerSave(close: boolean = false) {
    this.grilleService.triggerSave(close);
    this.askToSave?.nativeElement.classList.add('hidden');
  }

  triggerGrille() {
    this.grilleService.triggerGrille();
  }


}


