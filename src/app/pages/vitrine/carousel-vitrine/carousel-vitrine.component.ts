import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-vitrine',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
  templateUrl: './carousel-vitrine.component.html',
  styleUrl: './carousel-vitrine.component.scss'
})
export class CarouselVitrineComponent {
  slides = [
    {img: "assets/img/editeur.png", caption: "Editeur de contenu"},
    {img: "assets/img/admin-utilisateur.png", caption: "Gestion des utilisateurs"},
    {img: "assets/img/accueil.png", caption: "Accueil"},
    {img: "assets/img/admin-admin.png", caption: "Gestion des administrateurs"},
    {img: "assets/img/profil.png", caption: "Profil"},
    {img: "assets/img/discussion.png", caption: "Discussion"},
  ];

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "infinite": true,
    "autoplay": true,
    "accessibility": false,
    "draggable": false,
    "autoplaySpeed": 5000,
    "arrows": false,
    "touchMove": false,
    "arrowLeft": "<div class='slick-prev'><i class='fa fa-chevron-left'></i></div>",
    "arrowRight": "<div class='slick-next'><i class='fa fa-chevron-right'></i></div>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 5000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 5000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 5000,
        }
      }
    ]
  };
}
