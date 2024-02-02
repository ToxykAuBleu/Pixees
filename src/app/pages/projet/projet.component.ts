import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileCirclePlus, faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environment';

enum View {
  Accueil = "projectHome",
  Nouveau = "newProject", 
  Import = "importProject",
  Personalisation = "personalisationProject"
};

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})

@Injectable()
export class ProjetComponent {
  faFileCirclePlus = faFileCirclePlus;
  faFileImport = faFileImport;
  faXmark = faXmark;

  createForm: FormGroup = this.formBuilder.group({
    name: '',
    taille: '',
    bgcolor: '',
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) 
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
        next: (res) => {
          if (res.valueOf().hasOwnProperty('error')) {
            console.error(res);
          } else {
            console.log(res);
            this.router.navigate(['/', 'editeur']);
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
}
