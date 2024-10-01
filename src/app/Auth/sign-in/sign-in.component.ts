import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';


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

  http = inject(HttpClient);


  onLogin() {
    this.http.post('http://127.0.0.1:8000/api/login', this.loginObj).subscribe((res: any) => {
      if (res.result) {
        debugger;
        alert('Login successful')
        this.router.navigateByUrl("");
      } else {
        alert(res.message)
      }
    })
  }

}


