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
    email: ['', [Validators.required]],
    mdp: ['', [Validators.required]],
  });

  get email(): FormControl { return this.signInForm.get('email') as FormControl; }
  get mdp(): FormControl { return this.signInForm.get('mdp') as FormControl; }

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: AppService)
  { };

  goToInscription() {
    this.router.navigate(['/', 'inscription']);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
