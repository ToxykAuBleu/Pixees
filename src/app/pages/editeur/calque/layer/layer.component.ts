import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
import { Calque } from '../../../../../Algo/scripts/Calque';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.scss'
})
export class LayerComponent implements OnInit {
  @Input() _name: string = "";
  @Input() _hauteur: number = 0;
  @Input() _largeur: number = 0;
  @Input() _position: number = 0;
  @Input() _layerNumber: number = 0;
  @Input() isSelected: boolean = false;
  @Input() _calque!: Calque;
  _layerCount: number = 0;
  private isInitialValueSet = false
  isHidden: boolean = false;
  isBeingRenamed: boolean = false;
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<number>();
  @Output() hide = new EventEmitter<number>();

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
  faEyeSlash = faEyeSlash;
  faPenToSquare = faPenToSquare;

  renameLayer() {
    if (this.isBeingRenamed) {
      this._calque.setNom(this._name);
      this.isBeingRenamed = !this.isBeingRenamed;
    } else {
      this.isBeingRenamed = !this.isBeingRenamed;
    }
  }

  applyName() {
  }

  toggleVisibility() {
    this.isHidden = !this.isHidden;
    this.hide.emit();
  }

  deleteLayer() {
    this.delete.emit();
  }

  selectLayer() {
    this.select.emit(this._position);
  }
}
