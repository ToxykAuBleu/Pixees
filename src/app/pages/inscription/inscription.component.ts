import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  faArrowLeft = faArrowLeft;
  constructor(private router: Router) { }
  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
  }
  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
