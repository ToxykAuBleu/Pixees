import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum ButtonColor {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
  White = "#ffffff",
}

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() popupTitle!: string;
  @Input() popupContent!: string;
  @Input() popupButtonList!: {name: string, action: () => void, color: String }[];
}
