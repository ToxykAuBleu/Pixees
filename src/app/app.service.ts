import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isInEditorSource = new BehaviorSubject<boolean>(false);
  isInEditor = this.isInEditorSource.asObservable();

  private closeEditorSource = new Subject<void>();
  closeEditor$ = this.closeEditorSource.asObservable();

  setIsInEditor(isInEditor: boolean): void {
    this.isInEditorSource.next(isInEditor);
  }

  triggerCloseEditor() {
    this.closeEditorSource.next();
  }
}
