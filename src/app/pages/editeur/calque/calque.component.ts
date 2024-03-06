import { Inject, Component, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan, faArrowUp, faArrowDown, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { GrilleComponent } from '../grille/grille.component';
import { InjectionToken } from '@angular/core';
import { GrilleService } from '../../../grille-service.service';
import { PopupService } from '../../popup/popup.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';

export const POSITION = new InjectionToken<number>('Position');
export const NOM = new InjectionToken<string>('Nom');

@Component({
  selector: 'app-calque',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './calque.component.html',
  styleUrl: './calque.component.scss',
  providers: [{ provide: POSITION, useValue: 1 }, { provide: NOM, useValue: 'Calque' }]
})
export class CalqueComponent extends GrilleComponent {
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
    @Inject(NOM) private nom: string,
    @Inject(PLATFORM_ID) platformId: Object,
    grilleService: GrilleService,
    popupService: PopupService,
    http: HttpClient,
    appService: AppService,
    router: Router)
  {
    super(platformId, grilleService, popupService, appService, http, router);
    this._position = position;
    this._nom = nom;
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
