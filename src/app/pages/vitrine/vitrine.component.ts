import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.scss'
})
export class VitrineComponent {
  constructor(private router: Router) {
  }
  goToProjet() {
    this.router.navigate(['/projet']);
  }
}
