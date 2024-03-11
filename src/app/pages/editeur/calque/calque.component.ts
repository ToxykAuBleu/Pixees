import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { LayerComponent } from './layer/layer.component';
import { CommonModule } from '@angular/common';
import { Calque } from '../../../../Algo/scripts/Calque';

@Component({
  selector: 'app-calque',
  standalone: true,
  imports: [FontAwesomeModule, LayerComponent, CommonModule],
  templateUrl: './calque.component.html',
  styleUrl: './calque.component.scss',
})
export class CalqueComponent {
  @Input() layerCount: number = 0;
  @Input() layerList: Calque[] = [];
  @Input() selectedLayer: number = 0;
  @Output() addLayer = new EventEmitter<Calque>();
  @Output() deleteLayer = new EventEmitter<number>();
  @Output() selectLayer = new EventEmitter<number>();
  @Output() moveLayerUp = new EventEmitter<number>();
  @Output() moveLayerDown = new EventEmitter<number>();

  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
  faEye = faEye;

  constructor(){}

  newLayer() {
    console.log("New Layer Added");
    this.addLayer.emit();
  }

  delete(index: number) {
    console.log("Layer Deleted");
    this.deleteLayer.emit(index);
  }

  select(index: number) {
    console.log("Layer Selected" + index);
    this.selectLayer.emit(index)
  }

  layerUp(index: number) {
    console.log("Layer Moved Up" + index);
    this.moveLayerUp.emit(index);
  }

  layerDown(index: number) {
    this.moveLayerDown.emit(index);
  }
}
