import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss'
})
export class CompteComponent {
  faArrowLeft = faArrowLeft;
  constructor(private router: Router) { }
  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
  }
  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
