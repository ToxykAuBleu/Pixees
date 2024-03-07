import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isInEditorSource = new BehaviorSubject<boolean>(false);
  isInEditor = this.isInEditorSource.asObservable();

  private closeEditorSource = new Subject<void>();
  closeEditor$ = this.closeEditorSource.asObservable();

  private isConnectedSource = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSource.asObservable();

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };
    this.http.get(`${environment.apiLink}/user/connected.php`, httpOptions)
      .subscribe({
        next: (res) => {
          if (res.valueOf().hasOwnProperty('error')) {
            console.error(res);
          } else {
            this.setIsConnected(true);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  setIsConnected(isConnected: boolean): void {
    this.isConnectedSource.next(isConnected);
  }

  private projectNameSource = new BehaviorSubject<string>('');
  projectName = this.projectNameSource.asObservable();

  setIsInEditor(isInEditor: boolean): void {
    this.isInEditorSource.next(isInEditor);
  }

  triggerCloseEditor() {
    this.closeEditorSource.next();
  }

  setProjectName(projectName: string) {
    this.projectNameSource.next(projectName);
  }
}
