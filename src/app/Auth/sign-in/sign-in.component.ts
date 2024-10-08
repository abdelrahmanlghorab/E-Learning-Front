import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  passwordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';

  constructor(private fb: FormBuilder ,private router: Router ,private authservices: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form Submitted', this.signInForm.value);
      this.authservices.login(this.signInForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/student-dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
  

  get formControls() {
    return this.signInForm.controls;
  }
}
