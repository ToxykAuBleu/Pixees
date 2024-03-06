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

  onSubmit(): void {
    console.log('submitted');
    const submitButton: HTMLElement = document.getElementById('connectButton')!;
    submitButton.setAttribute('disabled', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };

    this.http.post(`${environment.apiLink}/user/connect.php`, this.signInForm.value, httpOptions)
      .subscribe({
        next: (res) => {
          if (res.valueOf().hasOwnProperty('error')) {
            console.error(res);
          } else {
            console.log(res);
            this.router.navigate(['/home'], { state: { data: Boolean(res) }})
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          submitButton.removeAttribute('disabled');
        }
      });
  }

  goToInscription() {
    this.router.navigate(['/', 'inscription']);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
