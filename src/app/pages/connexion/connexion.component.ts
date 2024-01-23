import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  faArrowLeft = faArrowLeft;
  constructor(private router: Router) {}
  goToInscription() {
    this.router.navigate(['/', 'inscription']);
  }
}
