import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
import { Calque } from '../../../../../Algo/scripts/Calque';

@Component({
  selector: 'app-layer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.scss'
})
export class LayerComponent implements OnInit {
  @Input() _hauteur: number = 0;
  @Input() _largeur: number = 0;
  @Input() _position: number = 0;
  @Input() _layerNumber: number = 0;
  _layerCount: number = 0;
  private isInitialValueSet = false
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<number>();

  public _calque!: Calque;

  constructor() {}

  ngOnInit(): void {
    if (!this.isInitialValueSet) {
      this._layerCount = this._layerNumber;
      this.isInitialValueSet = true
    }
  }

  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
  faEye = faEye;

  deleteLayer() {
    this.delete.emit();
  }

  selectLayer() {
    this.select.emit(this._position);
  }
}
