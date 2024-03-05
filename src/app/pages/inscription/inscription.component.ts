import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environment';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  faArrowLeft = faArrowLeft;

  signUpForm: FormGroup = this.formBuilder.group({
    pseudo: '',
    email: '',
    mdp: '',
    confirmation: ''
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: AppService)
  { };

  onSubmit(): void {
    console.log('test');
    const submitButton: HTMLElement = document.getElementById('registerButton')!;
    submitButton.setAttribute('disabled', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
      }),
      withCredentials: true
    };

    this.http.post(`${environment.apiLink}/project/register.php`, this.signUpForm.value, httpOptions)
      .subscribe({
        next: (res) => {
          if (res.valueOf().hasOwnProperty('error')) {
            console.error(res);
          } else {
            console.log(res);
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

  goToConnexion() {
    this.router.navigate(['/', 'connexion']);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
