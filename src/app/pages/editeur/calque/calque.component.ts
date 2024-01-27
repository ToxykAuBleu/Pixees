import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calque',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './calque.component.html',
  styleUrl: './calque.component.scss'
})
export class CalqueComponent {
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
}
