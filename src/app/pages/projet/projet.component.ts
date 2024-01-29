import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileCirclePlus, faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';

enum View {
  Accueil = "projectHome",
  Nouveau = "newProject", 
  Import = "importProject"
};

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})
export class ProjetComponent {
  faFileCirclePlus = faFileCirclePlus;
  faFileImport = faFileImport;
  faXmark = faXmark;

  
  constructor(private router: ActivatedRoute) {};
  
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      console.log(params);
      
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
}
