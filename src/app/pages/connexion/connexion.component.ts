import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environment';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  faArrowLeft = faArrowLeft;

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    mdp: ['', [Validators.required]],
  });

  get email(): FormControl { return this.signInForm.get('email') as FormControl; }
  get mdp(): FormControl { return this.signInForm.get('mdp') as FormControl; }

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: AppService)
  { };

  public error: boolean = false;
  public success: boolean = false;

  onSubmit(): void {
    const submitButton: HTMLElement = document.getElementById('connectButton')!;
    const submitLoader: HTMLElement = document.querySelector('#connectButton > .animate-spin')!;
    submitButton.setAttribute('disabled', 'true');
    submitLoader.classList.remove('hidden');

    this.error = false;
    this.success = false;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };

    this.http.post(`${environment.apiLink}/user/connect.php`, this.signInForm.value, httpOptions)
      .subscribe({
        next: async (res: any) => {
          if (res.valueOf().hasOwnProperty('error')) {
            console.error(res);
            this.error = true;
            const errorText: HTMLElement = document.getElementById('error')!;
            errorText.innerHTML = res.error;
          } else {
            this.error = false;
            this.success = true;
            const errorText: HTMLElement = document.getElementById('error')!;
            errorText.innerHTML = "";
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.router.navigate(['/vitrine']).then(() => {
              this.appService.setIsConnected(true);
            });
          }
        },
        error: (err) => {
          console.error(err);
          submitButton.removeAttribute('disabled');
          submitLoader.classList.add('hidden');
        },
        complete: () => {
          submitButton.removeAttribute('disabled');
          submitLoader.classList.add('hidden');
        }
      });
  }

  goToInscription() {
    this.router.navigate(['/', 'inscription']);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }

  goToVitrine() {
    this.router.navigate(['/', 'vitrine']);
  }
}
