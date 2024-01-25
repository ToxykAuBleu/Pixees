import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileCirclePlus, faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) {};
  newProject() {
    this.router.navigate(['/', 'editeur']);
  }

  importProject() {
    console.log("Import projet");
  }
}
