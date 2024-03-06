import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isInEditorSource = new BehaviorSubject<boolean>(false);
  isInEditor = this.isInEditorSource.asObservable();

  setIsInEditor(isInEditor: boolean): void {
    this.isInEditorSource.next(isInEditor);
  }
}
