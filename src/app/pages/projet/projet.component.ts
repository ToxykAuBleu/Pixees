import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})
export class ProjetComponent {
  constructor(private router: Router) {};
  goToEditeur() {
    this.router.navigate(['/', 'editeur']);
  }
}
