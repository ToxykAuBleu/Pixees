import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileCirclePlus, faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';

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
    private http: HttpClient) 
  { };
  
  
  onSubmit(): void {
    console.log(this.createForm.value);
    const submitButton: HTMLElement = document.getElementById('createButton')!;
    submitButton.setAttribute('disabled', 'true');

    this.http.post('http://localhost:8080/api/project/create.php', this.createForm.value).subscribe( 
      (res) => {
        console.log("Répondu: ", res);
        submitButton.removeAttribute('disabled');
      },
      (err) => {
        console.log("Erreur: ", err);
        submitButton.removeAttribute('disabled');
      });
  }

  switchView(view: string) {
    for (const v of Object.values(View)) {
      document.getElementById(v)?.classList.add('hidden');
    }
    document.getElementById(view)!.classList.remove('hidden');
  }

  projectHome() {
    this.switchView(View.Accueil);
  }

  newProject() {
    this.switchView(View.Nouveau);
  }

  importProject() {
    this.switchView(View.Import);
  }

  personalisationProject() {
    this.switchView(View.Personalisation);
  }

}
