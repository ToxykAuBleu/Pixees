import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  slides = [
    {img: "assets/img/1.jpg"},
    {img: "assets/img/2.jpg"},
    {img: "assets/img/3.jpg"},
    {img: "assets/img/4.jpg"},
    {img: "assets/img/5.jpg"},
    {img: "assets/img/6.jpg"},
    {img: "assets/img/7.jpg"},
    {img: "assets/img/8.jpg"},
    {img: "assets/img/9.jpg"},
  ];

  slideConfig = {
    "slidesToShow": 4, 
    "slidesToScroll": 1,
    "infinite": true,
    "autoplay": false,
    "autoplaySpeed": 2000,
    "arrows": true,
    "arrowLeft": "<div class='slick-prev'><i class='fa fa-chevron-left'></i></div>",
    "arrowRight": "<div class='slick-next'><i class='fa fa-chevron-right'></i></div>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          "slidesToShow": 3,
          "slidesToScroll": 3,
          "infinite": true,
          "autoplay": false,
          "autoplaySpeed": 2000,
          "arrows": true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "infinite": true,
          "autoplay": false,
          "autoplaySpeed": 2000,
          "arrows": true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": false,
          "autoplaySpeed": 2000,
          "arrows": true,
        }
      }
    ]
  };
}
