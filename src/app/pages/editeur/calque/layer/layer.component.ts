import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.scss'
})
export class LayerComponent {
  @Output() delete = new EventEmitter<void>();

  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
  faEye = faEye;

  deleteLayer() {
    this.delete.emit();
  }
}
