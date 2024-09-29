import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { StudentSignUPComponent } from "./Auth/Registeration/student-sign-up/student-sign-up.component";
import { TeacherSignUPComponent } from "./Auth/Registeration/teacher-sign-up/teacher-sign-up.component";
import { ForgetPasswordComponent } from "./Auth/forget-password/forget-password.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SignInComponent, 
    ReactiveFormsModule, 
    CommonModule,
    StudentSignUPComponent, 
    TeacherSignUPComponent, 
    ForgetPasswordComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ana-kafou';
}
