import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupChangeSource = new Subject<{titre: string, bgColor: string, desc: string, listeBoutons: {name: string, action: () => void, color: string }[]}>();
  public popupChange$ = this.popupChangeSource.asObservable();

  private popupActiveSource = new Subject<void>();
  popupActive$ = this.popupActiveSource.asObservable();

  private popupCloseSource = new Subject<void>();
  popupClose$ = this.popupCloseSource.asObservable();

  changePopup(titre: string, bgColor: string, desc: string, listeBoutons: {name: string, action: () => void, color: string }[]) {
    this.popupChangeSource.next({titre, bgColor, desc, listeBoutons});
  }

  activePopup() {
    this.popupActiveSource.next();
  }

  closePopup() {
    this.popupCloseSource.next();
  }
}