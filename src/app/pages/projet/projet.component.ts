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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: AppService,
    )
  { };
  
  onSubmit(): void {
    const submitButton: HTMLElement = document.getElementById('createButton')!;
    submitButton.setAttribute('disabled', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };
    this.http.post(`${environment.apiLink}/project/create.php`, this.createForm.value, httpOptions)
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
        },
        complete: () => {
          submitButton.removeAttribute('disabled');
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
