import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/Auth/auth.service';


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

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      studentEmail: ['', [Validators.required, Validators.email]],
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
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  get formControls() {
    return this.signInForm.controls;
  }

  loginObj: any = {
    'email': '',
    'password': ''
  }
  authServices = inject(AuthService)
  
  Login() {
    this.authServices.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('Login successful')
        console.log(res.data);
        localStorage.setItem('Token', res.token);
        localStorage.setItem('data', JSON.stringify(res.data));
        this.router.navigateByUrl("tests");

      } else {
        alert(res.message)
      }
    })
  }

}


