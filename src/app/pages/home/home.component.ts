import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { PublicationComponent } from "../publication/publication.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CarouselComponent, PublicationComponent]
})
export class HomeComponent {

}
