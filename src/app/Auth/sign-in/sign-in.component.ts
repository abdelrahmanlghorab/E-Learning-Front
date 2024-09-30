import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  passwordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';

  constructor(private fb: FormBuilder) {
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
}
