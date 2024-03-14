import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileCirclePlus, faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environment';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';

enum View {
  Accueil = "projectHome",
  Nouveau = "newProject", 
  Import = "importProject",
  Personalisation = "personalisationProject"
};

export interface DataProject {
  user?: number;
  id?: number;
  name: string;
  /** [largeur, hauteur] */ 
  taille: [number, number]; 
  bgcolor?: string;
  calques?: {
    [name: string]: {
      pos: number
      grille?: { [y: number]: string[] }
    }
  };
  dateCreation?: string;
  dateModif?: string;
}

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})

@Injectable()
export class ProjetComponent {
  faFileCirclePlus = faFileCirclePlus;
  faFileImport = faFileImport;
  faXmark = faXmark;

  createForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(26)]],
    taille: ['', [Validators.required]],
    bgcolor: ['', [Validators.required, Validators.pattern(/^#[0-9A-Fa-f]{6}$/)]],
  });
  
  get name(): FormControl { return this.createForm.get('name') as FormControl; }
  get taille(): FormControl { return this.createForm.get('taille') as FormControl; }
  get bgcolor(): FormControl { return this.createForm.get('bgcolor') as FormControl; }

  projects: DataProject[] = [];
  httpOptions: { headers: HttpHeaders, withCredentials: boolean } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
    }),
    withCredentials: true
  };
  hasSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: AppService,
    )
  { };
  
  onSubmit(create: boolean = false, idLoad: number | undefined = undefined): void {
    // Création d'un nouveau projet.
    if (create) {
      const submitButton: HTMLElement = document.getElementById('createButton')!;
      const submitLoader: HTMLElement = document.querySelector('#createButton > .animate-spin')!;
      submitLoader.classList.remove('hidden');
      submitButton.setAttribute('disabled', 'true');

      this.http.post(`${environment.apiLink}/project/create.php`, this.createForm.value, this.httpOptions)
        .subscribe({
          next: (res: any) => {
            if (res.valueOf().hasOwnProperty('error')) {
              console.error(res);
              if (res.error === "Couleur d'arrière plan non défini") {
                this.bgcolor.markAsDirty();
              } else if (res.error === "Taille du projet non défini") {
                this.taille.markAsDirty();
              }
            } else {
              console.log(res);
              this.router.navigate(['/editeur'], { state: { data: JSON.stringify(res) }})
              this.appService.setIsInEditor(true);
            }
          },
          error: (err) => {
            console.error(err);
            submitButton.removeAttribute('disabled');
            submitLoader.classList.add('hidden');
          },
          complete: () => {
            submitButton.removeAttribute('disabled');
            submitLoader.classList.add('hidden');
          }
        });
    } 
    // Chargement d'un projet existant.
    else {
      if (this.hasSubmitted) return;
      
      this.hasSubmitted = true;
      this.http.get(`${environment.apiLink}/project/load.php?id=${idLoad}&grille=true`, this.httpOptions)
        .subscribe({
          next: (res: any) => {
            if (res.valueOf().hasOwnProperty('error')) {
              console.error("Erreur: ", res);
            } else {
              console.log(res);
              this.router.navigate(['/editeur'], { state: { data: JSON.stringify(res) }})
              this.appService.setIsInEditor(true);
            }
          },
          error: (err) => {
            console.error(err);
            this.hasSubmitted = false;
          },
          complete: () => {
            this.hasSubmitted = false;
          }
        });
    }
  }

  getListProjects(): void {
    this.http.get(`${environment.apiLink}/project/list.php`, this.httpOptions).subscribe({
      next: (res: any) => {
        if (res.valueOf().hasOwnProperty('error')) {
          console.error("Erreur: ", res);
        } else {
          // console.log(res);
          const projects = [];
          for (const project of res) {
            projects.push({
              user: project["utilisateur"],
              id: project["projet"],
              name: project["nom"],
              taille: [project["hauteurToile"], project["largeurToile"]],
              bgcolor: project["bgcolor"],
              grille: project["grille"],
              dateCreation: project["dateCreation"],
              dateModif: project["dateModif"]
            } as DataProject);
          }
          this.projects = projects;
          console.log(this.projects);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  switchView(view: string): void {
    for (const v of Object.values(View)) {
      document.getElementById(v)?.classList.add('hidden');
    }
    document.getElementById(view)!.classList.remove('hidden');
  }

  redirectHome(): void {
    this.router.navigate(['/', 'home']);
  }

  projectHome(): void {
    this.switchView(View.Accueil);
  }

  newProject(): void {
    this.switchView(View.Nouveau);
  }

  importProject(): void {
    this.switchView(View.Import);
  }

  personalisationProject(): void {
    this.switchView(View.Personalisation);
  }

  changeTaille(hauteur: number | HTMLInputElement, largeur: number | HTMLInputElement) {
    if (hauteur instanceof HTMLInputElement && largeur instanceof HTMLInputElement) {
      this.createForm.controls['taille'].setValue(`${hauteur.value}x${largeur.value}`);
    } else {
      this.createForm.controls['taille'].setValue(`${hauteur}x${largeur}`);
    }
  }

  changeActiveButton(button: string): void {
    const buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }
    document.getElementById(button)!.classList.add('active');
  }
}
