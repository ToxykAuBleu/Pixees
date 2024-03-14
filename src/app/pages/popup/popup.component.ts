import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum ButtonColor {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
  White = "#ffffff",
}

export enum BgColor {
  Default = "#A1A1AA",
  Accueil = "#7CEB60",
  Profil = "#EA8080",
  Editeur = "#AF80EA",
  Discussion = "#80D7EA",
  Admin = "#EBBC60",
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
  @Input() popupBgColor: string = BgColor.Default;
  @Input() popupButtonList!: {name: string, action: () => void, color: String }[];
}
