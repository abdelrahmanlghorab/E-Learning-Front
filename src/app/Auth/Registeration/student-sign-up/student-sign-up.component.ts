import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.css']
})
export class StudentSignUPComponent implements OnInit {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye'; 
  confirmEyeIcon: string = 'fas fa-eye'; 

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\s]+$')]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*') 
      ]],
      confirmPassword: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      profilePicture: ['', Validators.required, Validators.pattern( "^[^\s]+\.(jpg|jpeg|png|gif|bmp)$")],
      
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    this.confirmEyeIcon = this.confirmEyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Form Submitted", this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched(); 
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
