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
    {img: "assets/img/editeur.png"},
    {img: "assets/img/admin-utilisateur.png"},
    {img: "assets/img/accueil.png"},
    {img: "assets/img/admin-admin.png"},
    {img: "assets/img/profil.png"},
    {img: "assets/img/discussion.png"},
  ];

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 8000,
    "arrows": true,
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
          "autoplaySpeed": 8000,
          "arrows": true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 8000,
          "arrows": true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 8000,
          "arrows": true,
        }
      }
    ]
  };
}
