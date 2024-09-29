import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './teacher-sign-up.component.html',
  styleUrl: './teacher-sign-up.component.css'
})
export class TeacherSignUPComponent {
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye'; 
  confirmEyeIcon: string = 'fas fa-eye'; 

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    this.confirmEyeIcon = this.confirmEyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }
}
