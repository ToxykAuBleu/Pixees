import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselVitrineComponent } from './carousel-vitrine/carousel-vitrine.component';


@Component({
    selector: 'app-vitrine',
    standalone: true,
    templateUrl: './vitrine.component.html',
    styleUrl: './vitrine.component.scss',
    imports: [CarouselVitrineComponent]
})
export class VitrineComponent {
  constructor(private router: Router) {
  }
  goToProjet() {
    this.router.navigate(['/projet']);
  }
}
