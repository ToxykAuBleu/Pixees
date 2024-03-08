import { Inject, Component, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { InjectionToken } from '@angular/core';
import { LayerComponent } from './layer/layer.component';
import { CommonModule } from '@angular/common';

export const POSITION = new InjectionToken<number>('Position');
export const NOM = new InjectionToken<string>('Nom');

@Component({
  selector: 'app-calque',
  standalone: true,
  imports: [FontAwesomeModule, LayerComponent, CommonModule],
  templateUrl: './calque.component.html',
  styleUrl: './calque.component.scss',
  providers: [{ provide: POSITION, useValue: 1 }, { provide: NOM, useValue: 'Calque' }]
})
export class CalqueComponent {
  @Input() layerList: LayerComponent[] = [];
  @Output() addLayer = new EventEmitter<void>();

  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCopy = faCopy;
  faEye = faEye;

  private _position: number;
  private _nom: string;

  constructor(
    @Inject(POSITION) private position: number,
    @Inject(NOM) private nom: string,)
  {
    this._position = position;
    this._nom = nom;
  }

  newLayer() {
    console.log("New Layer Added");
    this.addLayer.emit();
  }

  deleteLayer(index: number) {
    console.log("Layer Deleted");
    this.layerList.splice(index, 1);
  }

  getPosition(): number {
    return this._position;
  }

  getNom(): string {
    return this._nom;
  }

  setPosition(position: number): void {
    this._position = position;
  }

  setNom(nom: string): void {
    this._nom = nom;
  }
}
